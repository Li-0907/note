---
title: spring MVC笔记
---

ssm：Spring MVC + spring + Mybatis

## DispatcherServlet

在 web.xml 中加入一个 springmvc 写好的 servlet

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
<!--    配置DispatchServlet-->
    <servlet>
        <servlet-name>springmvc</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
<!--        要绑定springmvc配置文件-->
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:springmvc-servlet.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>springmvc</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>

    <!--
    在springmvc中， / 只匹配servlet,不会匹配jsp
                   /* 都匹配
    -->
</web-app>
```

要在这个 servlet 中绑定 springmvc 的配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">

    <!--处理器映射器-->
    <bean class="org.springframework.web.servlet.handler.BeanNameUrlHandlerMapping"/>

    <!--处理器适配器-->
    <bean class="org.springframework.web.servlet.mvc.SimpleControllerHandlerAdapter"/>

    <!--视图解析器-->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver" id="internalResourceViewResolver">
        <!--前缀-->
        <property name="prefix" value="/WEB-INF/jsp/"/>
        <!--后缀-->
        <property name="suffix" value=".jsp"/>
    </bean>

    <!--BeanNameUrlHandlerMapping  这部分是自己写的controller类，id即为我们要访问的路径-->
    <bean id="/hello" class="com.lixingyu.controller.HelloController"/>

</beans>
```

这些都是死的！但是在真实开发中不会这样写，springmvc 提供了注解的方式。

---

## 注解方式

在 web.xml 中的全局 Servlet 仍然不变

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
<!--    配置DispatchServlet-->
    <servlet>
        <servlet-name>springmvc</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
<!--        要绑定springmvc配置文件-->
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:springmvc-servlet.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>springmvc</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
</web-app>
```

在 spring 配置文件中加入

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
    http://www.springframework.org/schema/context
    http://www.springframework.org/schema/context/spring-context-3.0.xsd http://www.springframework.org/schema/mvc https://www.springframework.org/schema/mvc/spring-mvc.xsd">

    <!--自动扫描包，让指定包下的注解生效由I0C容器统一管理-->
    <context:component-scan base-package="com.lixingyu.controller"/>
    <!--过滤静态资源-->
    <mvc:default-servlet-handler/>
    <!--注解驱动-->
    <mvc:annotation-driven/>

    <!--视图解析器-->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver" id="internalResourceViewResolver">
        <!--前缀-->
        <property name="prefix" value="/WEB-INF/jsp/"/>
        <!--后缀-->
        <property name="suffix" value=".jsp"/>
    </bean>

    <!--BeanNameUrlHandlerMapping-->

</beans>
```

- 可以看到，开启注解功能后，只需要加上<mvc:default-servlet-handler/>和<mvc:annotation-driven/>，spring 会自动将处理器映射器和处理器适配器加入配置文件。
- 在自己定义的 controller 中，只需要

```java
package com.lixingyu.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller // 标记他为一个controller
public class HelloController {

    @RequestMapping("/hello")  // 访问路径
    public String hello(Model model) {  // 同伙model对象，可以设置传参等等。

        model.addAttribute("msg", "hello springMVCAnnotation");

        return "hello";  // return的结果会通过视图解析器拼接成路径。
    }
}

```

---

---

## controller 的实现方式

#### 实现 Controller 接口(较老，不建议使用)

```java
package com.lixingyu.controller;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

// 只要实现了Controller的类，说明这个类是个控制器
public class ControllerTest1 implements Controller {
    @Override
    public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("msg", "ControllerTest1");
        modelAndView.setViewName("test");

        return modelAndView;
    }
}
```

缺点：一个类中只能加一个访问路径

---

#### 注解方式

```java
package com.lixingyu.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

              // 添加 @Controller 这个注解的类会被spring托管，
              // 并且只要这个类中的方法返回值为String且有具体页面可以跳转，
@Controller   // 那么就会被视图解析器所解析
public class ControllerTest2 {

    @RequestMapping("/t2")   // 访问路径
    public String test1(Model model) {
        model.addAttribute("msg","ControllerTest2"); // 设置参数


        return "test";// 跳转路径
    }
}
```

---

## RestFul 风格

一种资源定义的风格

- 原来的请求传参方式：[http://localhost:8080/add?a=1&b=10](http://localhost:8080/add?a=1&b=10)

controller 代码

```java
package com.lixingyu.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RestFulController {

    @RequestMapping("/add")
    public String test1(int a, int b, Model model) {
        int res = a + b;
        model.addAttribute("msg", "res:" + res);
        return "test";
    }
}
```

---

- RestFul：[http://localhost:8080/add/1/24](http://localhost:8080/add/1/24)

controller 代码

```java
package com.lixingyu.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RestFulController {

    @RequestMapping("/add/{a}/{b}")
    public String test1(@PathVariable int a,@PathVariable int b, Model model) {  // @PathVariable 路径变量
        int res = a + b;
        model.addAttribute("msg", "res:" + res);
        return "test";
    }
}

```

同时可以通过几种@RequestMapping 的变种来 指定请求方法：

```java
@GetMapping			// 只能get方法请求,其他方法请求则405
@PostMapping		// 只能post方法请求
@PutMapping			// 只能put方法请求
@DeleteMapping		// 只能delete方法请求
```

controller 代码

```java
package com.lixingyu.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class RestFulController {

    @GetMapping("/add/{a}/{b}")
    public String test1(@PathVariable int a,@PathVariable int b, Model model) {  // @PathVariable 路径变量
        int res = a + b;
        model.addAttribute("msg", "res:" + res);
        return "test";
    }
}
```

通过不同的 @RequestMapping 的变种，实现不同请求方式去访问同一 url 显示的内容不同。

RestFul 风格的好处

- 简洁
- 较为安全，不暴露请求参数名字
- 高效（支持缓存）

---

## 转发和重定向

如果要实现转发和重定向，在 controller 中的 方法中的 return 路径前加 forward/redirect

```java
return "forward:/index.jsp";
return "redirect:/index.jsp";
```

**他默认为转发，如果使用了视图解析器，只需要添加他的名字即可，不用写全路径**

## 乱码处理

springmvc 中定义了解决乱码问题的 Filter，我们只需要像写之前的 DispatcherServle 一样在 web.xml 中加入一个 springmvc 中的过滤器，即可解决大部分乱码问题

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <!--    配置DispatchServlet-->
    <servlet>
        <servlet-name>springmvc</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <!--        要绑定springmvc配置文件-->
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:springmvc-servlet.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>springmvc</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>

    <!--springmvc的乱码过滤器-->
    <filter>
        <filter-name>encoding</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>utf-8</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>encoding</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
</web-app>
```

#### web.xml 的 url-pattern 匹配：

- /\* 会匹配所有页面
- / 只会匹配所有的 servlet，会自动过滤掉 jsp

---

## JSON

前后端分离时代，后端提供 json 字符串，前端处理

#### jackson

```xml
<!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-databind -->
<dependency>
	<groupId>com.fasterxml.jackson.core</groupId>
	<artifactId>jackson-databind</artifactId>
	<version>2.12.3</version>
</dependency>
```

#### controller 中返回字符串的方法

在 controller 的方法上添加 注解@ResponseBody，就不会走视图解析器，直接返回字符串

```java
@ResponseBody // 加了这个注解，就不会走视图解析器，会返回字符串。
```

在 controller 类上添加@RestController 注解，controller 中所有方法都不会走视图解析器，都会返回字符串。

```java
@RestController // 加了这个注解，controller中所有方法都不会走视图解析器，都会返回字符串。
```

#### 在 springmvc 中可以设置统一的乱码处理：

在 spring 的 annotation-driven 加入：

```xml
<mvc:annotation-driven>
	<mvc:message-converters register-defaults="true">
		<bean class="org.springframework.http.converter.StringHttpMessageConverter">
			<constructor-arg value="utf-8"/>
		</bean>
		<bean class="org.springframework.http.converter.json.MappingJackson2HttpMessageConverter">
			<property name="objectMapper">
				<bean class="org.springframework.http.converter.json.Jackson2ObjectMapperFactoryBean">
					<property name="failOnEmptyBeans" value="false"/>
				</bean>
			</property>
		</bean>
	</mvc:message-converters>
</mvc:annotation-driven>
```

#### Fastjson

fastjson.jar 是阿里开发的一款专门用于 Java 开发的包，可以方便的实现 json 对象与 JavaBean 对
象的转换，实现 JavaBean 对象与 json 字符串的转换，实现 json 对象与 json 字符串的转换。实现 json 的
转换方法很多，最后的实现结果都是一样的。

依赖

```xml
<dependency>
	<groupId>com.fasterxml.jackson.core</groupId>
	<artifactId>jackson-databind</artifactId>
	<version>2.12.3</version>
</dependency>
```

## 整合 ssm 框架

#### 必要的依赖和静态资源打包问题

```xml
<!--依赖-->
<dependencies>
	<dependency>
		<groupId>junit</groupId>
		<artifactId>junit</artifactId>
		<version>4.12</version>
		<scope>test</scope>
	</dependency>
	<!--mysql连接工具-->
	<dependency>
		<groupId>mysql</groupId>
		<artifactId>mysql-connector-java</artifactId>
		<version>8.0.22</version>
	</dependency>
	<!--c3p0-->
	<dependency>
		<groupId>com.mchange</groupId>
		<artifactId>c3p0</artifactId>
		<version>0.9.5.5</version>
	</dependency>
	<!--servlet三件套-->
	<dependency>
		<groupId>javax.servlet</groupId>
		<artifactId>servlet-api</artifactId>
		<version>2.5</version>
	</dependency>
	<dependency>
		<groupId>javax.servlet.jsp</groupId>
		<artifactId>jsp-api</artifactId>
		<version>2.2</version>
	</dependency>
	<dependency>
		<groupId>javax.servlet</groupId>
		<artifactId>jstl</artifactId>
		<version>1.2</version>
	</dependency>
	<!--mybatis-->
	<dependency>
		<groupId>org.mybatis</groupId>
		<artifactId>mybatis</artifactId>
		<version>3.5.7</version>
	</dependency>
	<!--mybatis-spring-->
	<dependency>
		<groupId>org.mybatis</groupId>
		<artifactId>mybatis-spring</artifactId>
		<version>2.0.2</version>
	</dependency>
	<!--spring-->
	<dependency>
		<groupId>org.springframework</groupId>
		<artifactId>spring-webmvc</artifactId>
		<version>5.3.19</version>
	</dependency>
	<!--spring-jdbc-->
	<dependency>
		<groupId>org.springframework</groupId>
		<artifactId>spring-jdbc</artifactId>
		<version>5.3.19</version>
	</dependency>
</dependencies>

<!--静态资源打包-->
<build>
	<resources>
		<resource>
			<!--java目录配置-->
			<directory>src/main/java</directory>
			<includes>
				<include>**/*.xml</include>
				<include>**/*.properties</include>
			</includes>
			<filtering>true</filtering>
		</resource>

		<!--resources目录配置-->
		<resource>
			<directory>src/main/resources</directory>
			<includes>
				<include>**/*.xml</include>
				<include>**/*.properties</include>
			</includes>
			<filtering>true</filtering>
		</resource>
	</resources>
</build>
```

## 拦截器

在 springmvc 中，只要实现了 HandlerInterceptor 接口的类，再将其注册到 springmvc 容器中，即可实现请求的拦截。

```java
package com.lixingyu.Interceptor;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class BookInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("================处理前==============");
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("================处理后==============");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("================清理==============");
    }
}
```

在容器中注册：

```xml
<!--拦截器-->
<mvc:interceptors>
	<mvc:interceptor>
		<!--  /**  过滤当前路径下的所有请求 -->
		<mvc:mapping path="/**"/>
		<bean class="com.lixingyu.Interceptor.BookInterceptor"/>
	</mvc:interceptor>
</mvc:interceptors>
```

**使用：**
在 preHandle 方法中返回 true 即为放行，false 即为拦截。
