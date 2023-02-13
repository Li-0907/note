---
title: spring 笔记
---

## Spring

**maven 依赖**：spring-webmvc  5.3.19

注意：5.2.2 版本不兼容 jdk16,可以换用 5.3.19

```xml
<!-- https://mvnrepository.com/artifact/org.springframework/spring-webmvc -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>5.3.19</version>
</dependency>
```

#### ApplicationContext.xml 模板

```xml
<?xml version="1.0" encoding="UTF-8"?>

<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">

    <bean id="hello" class="com.kuang.pojo.Hello">
        <property name="str" value="spring"></property>
    </bean>

</beans>
```

Spring 通过实体类中的 set 方法设置值，所以实体类中必须含有 set 方法

- value：具体的值
- ref：引用 spring 中创建好的对象

IOC:对象由 spring 创建，管理，装配

#### IOC 创建对象的方式

1.  使用无参构造创建（默认）
2.  有参构造创建
3.  下标赋值

```xml
<bean id="user" class="com.kuang.pojo.Hello">
    <constructor-arg index="0" value="哈哈"></constructor-arg>
</bean>
```

2.  参数类型赋值

```xml
<bean id="user" class="com.kuang.pojo.Hello">
    <constructor-arg index="0" value="哈哈"></constructor-arg>
</bean>
```

3.  参数名

```xml
<bean id="User" class="com.kuang.pojo.User">
    <constructor-arg name="name" value="哈哈"/>
</bean>
```

总结：在配置文件加载的时候，容器中管理的对象就已经初始化了！

## Spring 配置

#### 别名 alias

同过别的名字映射类

```xml
<alias name="User" alias="ass"/>
```

#### bean 配置

- id：唯一标识符
- class：全类限定名
- name：也是别名 --> 可以同时取多个，用分隔符分开，且分割符有很多种

```xml
<bean id="User" class="com.kuang.pojo.User" name="test1,test2 test3;test4">
    <constructor-arg name="name" value="哈哈"/>
</bean>
```

#### import

一般用于团队开发，可以将多个配置文件合并为一个

```xml
<?xml version="1.0" encoding="UTF-8"?>

<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">

    <import resource="beans.xml"/>

</beans>
```

## DI 依赖注入

#### 构造器注入

前面说过了

#### set 方式注入（重点）

- 依赖：bean 对象的创建依赖于容器
- 注入：bean 对象中的所有属性，由容器来注入

**测试环境：**

Student 实体类字段

```java
private String name;
private Address address;
private String[] books;
private List<String> hobbys;
private Map<String, String> card;
private Set<String> games;
private String wife;
private Properties info;
```

Address 为另一个引用的实体类

```java
public class Address {
    private String address;

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
```

beans.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>

<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">

    <bean id="adress" class="com.lixingyu.Address">
        <property name="address" value="东土大唐"/>
    </bean>

    <bean id="student" class="com.lixingyu.Student">
        <!--普通值注入-->
        <property name="name" value="李星宇"/>
        <!--bean注入-->
        <property name="address" ref="adress" />

        <!--数组注入-->
        <property name="books">
            <array>
                <value>《红楼梦》</value>
                <value>《水浒传》</value>
                <value>《三国演义》</value>
                <value>《西游记》</value>
            </array>
        </property>

        <!--list-->
        <property name="hobbys">
            <list>
                <value>吃饭</value>
                <value>睡觉</value>
                <value>打豆豆</value>
            </list>
        </property>

        <!--map-->
        <property name="card">
            <map>
                <entry key="username" value="zhangSan"/>
                <entry key="password" value="123456"/>
            </map>
        </property>

        <!--set-->
        <property name="games">
            <set>
                <value>LOL</value>
                <value>BNF</value>
            </set>
        </property>

        <!--null-->
        <property name="wife">
            <null />
        </property>

        <!--properties-->
        <property name="info">
            <props>
                <prop key="number">2014490047</prop>
                <prop key="name">haha</prop>
                <prop key="age">19</prop>
            </props>
        </property>
    </bean>

</beans>
```

test 测试

```java
import com.lixingyu.Student;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class MyTest {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
        Student student = (Student) context.getBean("student");

        System.out.println(student.toString());

    }
}
```

输出：

```xml
Student{name='李星宇', address=Address{address='东土大唐'}, books=[《红楼梦》, 《水浒传》, 《三国演义》, 《西游记》], hobbys=[吃饭, 睡觉, 打豆豆], card={username=zhangSan, password=123456}, games=[LOL, BNF], wife='null', info={number=2014490047, name=haha, age=19}}
```

#### 拓展方式注入

要只用拓展标签，就要在 xml 中添加 xml 约束

- P  (properties)   标签：加入 xmlns:p="[http://www.springframework.org/schema/p](http://www.springframework.org/schema/p)"     对应 set 注入
- c  (constuctor args)   标签：加入 xmlns:c="[http://www.springframework.org/schema/c](http://www.springframework.org/schema/c)"       对应构造器注入

```xml
<?xml version="1.0" encoding="UTF-8"?>

<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xmlns:c="http://www.springframework.org/schema/c"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">


</beans
```

```xml
<?xml version="1.0" encoding="UTF-8"?>

<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xmlns:c="http://www.springframework.org/schema/c"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">

    <bean id="user" class="com.lixingyu.User" p:name="李星宇" p:age="18"></bean>

    <bean id="user2" class="com.lixingyu.User" c:_0="haha" c:_1="18"></bean>

</beans>
```

#### bean 的作用域（scope）

Spring 提供**singleton**和“**prototype**两种基本作用域，（另外提供“request”、“session”、“global session”三种**web**作用域；Spring 还允许用户定制自己的作用域）。

- singleton 单例模式（默认）
- prototype   原型作用域

```xml
<bean id="user" class="com.lixingyu.User" p:name="李星宇" p:age="18" scope="prototype"></bean>
```

prototype 每次从容器中 get,都会产生一个新对象

## bean 的自动装配

- 自动装配是 Spring 满足 bean 依赖一种方式！
- Spring 会在上下文中自动寻找，并自动给 bean 装配属性

在 spring 中有三种装配方式

1. 在 xml 中显示装配
2. 在 java 中显示装配
3. bean 中隐式装配（重点）

**测试环境：一个人有一只猫，一只狗**

```java
private Cat cat;
private Dog dog;
private String name;
```

#### byName 自动装配

```xml
<?xml version="1.0" encoding="UTF-8"?>

<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">

    <bean id="cat" class="com.lixingyu.pojo.Cat"></bean>

    <bean id="dog" class="com.lixingyu.pojo.Dog"></bean>

    <bean id="person" class="com.lixingyu.pojo.Person" autowire="byName">
        <property name="name" value="你好"/>
    </bean>
</beans>
```

**byName:会自动在容器上下文中查找，和自己对象 set 方法后面的值对应的 bean 的 id**

#### byType 自动装配（默认使用）

```xml
<?xml version="1.0" encoding="UTF-8"?>

<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">

    <bean id="cat" class="com.lixingyu.pojo.Cat"></bean>

    <bean id="dog" class="com.lixingyu.pojo.Dog"></bean>

    <bean id="person" class="com.lixingyu.pojo.Person" autowire="byType">
        <property name="name" value="你好"/>
    </bean>
</beans>
```

**byType:会自动在容器上下文中查找，和自己对象属性类型相同的 bean**

- byName 的时候，需要保证所有 bean 的 id 唯一，并且这个 bean 需要和自动注入的属性的 set 方法的值一致！
- byType 的时候，需要保证所有 bean 的 class 唯一，并且这个 bean 需要和自动注入的属性的类型一致！

#### 使用注解装配

jdk1.5 支持注解，spring2.5 支持注解

**要使用注解开发，需要：**

- 导入约束
- 配置注解支持

```xml
<?xml version="1.0" encoding="UTF-8"?>

<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
    http://www.springframework.org/schema/context
    http://www.springframework.org/schema/context/spring-context-3.0.xsd">

	<!--指定扫面指定包下的注解-->
    <context:component-scan base-package="com.lixingyu"/>
    <!--开启注解支持-->
    <context:annotation-config />
</beans>
```

[**@AutoWird **](/AutoWird)\*\* \*\*

实体类的字段或者 set 方法上添加，添加到字段上时，可以省略 set 方法的编写，前提是名字符合规则：

```java
@Autowired
private Cat cat;
@Autowired
private Dog dog;
private String name;
```

```java
@Nullable   // 字段加了之后，可以为null
```

```java
@Autowired(required = false)   // 字段加了之后，可以为null,默认为true
```

配合[@Qualifier ](/Qualifier) 可以指定 bean 的 id 进行装配

```java
@Autowired
@Qualifier(value = "cat222")
private Cat cat;
@Autowired
private Dog dog;
private String name;
```

## 使用注解开发

spring 中，要使用注解开发，必须保证

- AOP 包导入了
- context 的 xml 约束

1.

#### bean

```java
@Component	// 组件    放在类上，说明类被spring管理了
```

2.

#### 属性如何注入

```java
package com.lixingyu.pojo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

// 组件
@Component
public class User {
    @Value("haha")
    public String name;
}
```

3.  @Component 的几个衍生注解

#### 衍生的注解（按照 MVC 三层架构分层）

- dao --> [@Repository ](/Repository)
- Service -->  [@Service ](/Service)
- controller（相当于 servlet 层）  -->  [@Controller ](/Controller)
  上边四个注解功能相同，都是将某个类注册到容器中，就是装配 bean

4.  自动装配
    详情见上边（@Autowired）

#### 自动装配

```java
@Autowired
@Nullable
@Qualifier
```

5.

#### 作用域

```java
@Scope(value = "")	// 作用域注解，singleton/propertype  ...
```

6.  xml 与注解

#### 小结

- xml 更加万能，适用于任何场合！维护简单方便
- 注解不是自己类使用不了，维护相对复杂！

xml 与注解最佳实现

- xml 用来管理 bean
- 注解只负责完成属性的注入
- 我们在使用的过程中，只需要注意一个问题：必须让注解生效，就需要开启注解支持

```xml
<!--指定扫面指定包下的注解-->
<context:component-scan base-package="com.lixingyu"/>
<!--开启注解支持-->
<context:annotation-config />
```

## 使用 java 方式配置 spring

不使用 spring 的 xml，全权交给 java

创建专门的包 config 管理 config 类

新建类

```xml
package com.lixingyu.config;

import com.lixingyu.pojo.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Liconfig {

    @Bean
    public User getUser() {
        return new User();
    }
}
```

使用[**@Configuration **](/Configuration)\*\* \*\*也会将类注册到 spring 容器中。Configuration 本身也是 compoent

[**@Bean **](/Bean)\*\* \*\*代表要注册的实体类，返回一个方法，方法名即为 bean 的 id，此时实体类可以不写 @Component

**@ComponentScan("com.lixingyu.pojo")**扫描包

**如果使用这种方式配置 spring,就得通过 AnnotationConfig 上下文来获取容器，装载对象，通过配置类的 class 对象加载：**

```java
import com.lixingyu.config.Liconfig;
import com.lixingyu.pojo.User;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class MyTest {

    public static void main(String[] args) {
        // AnnotationConfig上下文来获取容器，装载对象，通过配置类的class对象加载
        ApplicationContext context = new AnnotationConfigApplicationContext(Liconfig.class);
        User getUser = context.getBean("getUser", User.class);
        System.out.println(getUser.getName());
    }
}
```

java 配置文件可以有多个，通过@import 注解实现导入

```java
package com.lixingyu.config;

import com.lixingyu.pojo.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class config2 {

    @Bean
    public User getUser2() {
        return new User();
    }

}

```

用@Import 在第一个 config 文件中导入

```java
package com.lixingyu.config;

import com.lixingyu.pojo.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@ComponentScan("com.lixingyu.pojo")
@Import(config2.class)
public class Liconfig {

    @Bean
    public User getUser() {
        return new User();
    }
}

```

- 可以看到 @Import(config2.class) 里的值是上一个配置文件的 class 对象。

- 这种配置在 springBoot 中随处可见

## 代理模式

#### 为什么要学习代理模式？

**springAOP 的底层就是代理模式！**

#### 代理模式的分类

###### 静态代理

角色分析：

      - 抽象角色：一般使用接口或者抽象类解决
      - 真实角色：被代理对象
      - 代理角色：代理真实角色后，做一些附属操作
      - 客户：访问代理角色的人

代理模式的好处：

- 可以使真实角色操作更加纯粹，不用关注一些公共业务。
- 公共业务交给代理角色处理，实现业务分工。
- 公共业务发生拓展时，方便集中管理。

缺点：

- 一个真实角色就会产生代理角色，代码量翻倍。

代理的步骤：

- 1.接口

```java
package com.lixingyu.demo01;

// 租房
public interface Rant {

    public void rant();
}

```

- 2.真实角色

```java
package com.lixingyu.demo01;

// 房东
public class Host implements Rant {

    @Override
    public void rant() {
        System.out.println("房东要出租房子");
    }
}

```

- 3.代理角色

```java
package com.lixingyu.demo01;

public class Proxy implements Rant {

    private Host host;

    public Proxy() {
    }

    public Proxy(Host host) {
        this.host = host;
    }


    @Override
    public void rant() {
        host.rant();
    }

    public void SeeHouse() {
        System.out.println("中介带你看房");
    }

    public void fare() {
        System.out.println("收中介费");
    }

    public void heTong() {
        System.out.println("签合同");
    }
}
```

- 4.客户端访问代理角色

```java
package com.lixingyu.demo01;

public class Client {

    public static void main(String[] args) {
        Host host = new Host();
        Proxy proxy = new Proxy(host);
        proxy.rant();
        proxy.SeeHouse();
        proxy.heTong();
        proxy.fare();

    }
}

```

###### 动态代理

- 动态代理和静态代理角色一致
- 动态代理的代理类是动态生成的，不是直接写好的
- 动态代理两大类：基于接口的动态代理，基于类的动态代理
  - 基于接口：jdk 动态代理
  - 基于类：cglib
  - java 字节码实现：javasist

需要了解两个类： Proxy：代理，InvocationHandler

动态代理的好处：

- 可以使真实角色操作更加纯粹，不用关注一些公共业务。
- 公共业务交给代理角色处理，实现业务分工。
- 公共业务发生拓展时，方便集中管理。
- 一个动态代理类代理的是一个接口，一般对应的就是一类业务。
- 一个动态代理类可以实现多个接口实现类，只要实现了同一个接口。

通用 proxy 类

```java
package com.lixingyu.demo04;


import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class ProxyInvocationHandler implements InvocationHandler {

    // 被代理的接口
    private Object target;

    public void setTarget(Object target) {
        this.target = target;
    }

    public Object getProxy() {
        return Proxy.newProxyInstance(this.getClass().getClassLoader(), target.getClass().getInterfaces(),this);
    }

    // 处理代理实例，并返回结果
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        log(method);
        Object result = method.invoke(target, args);
        return result;
    }

    public void log(Method method) {
        System.out.println("执行了"+method.getName()+"方法");
    }

}
```

## AOP（面向切面编程）

通过预编译方式和运行期动态代理实现程序功能的统一维护的一种技术。
（简单来说，就是在不改动原有代码的基础上，增加一些方法，例如在执行某个方法之前和执行完之后各打印一次日志，下面例子都是以打印日志为例）

#### AOP 依赖

```xml
<dependency>
  <groupId>org.aspectj</groupId>
  <artifactId>aspectjweaver</artifactId>
  <version>1.9.4</version>
</dependency>
```

#### 实现方式

###### 方式一：使用 spring 原生 API 接口

一个 UserService 接口，一个 UserServiceImpl 实现类，要实现前置日志和后置日志，

```java
package com.lixingyu.log;

import org.springframework.aop.MethodBeforeAdvice;

import java.lang.reflect.Method;

public class Log implements MethodBeforeAdvice {

    // method: 要执行的目标方法
    // Object: 参数
    // target: 目标对象
    @Override
    public void before(Method method, Object[] args, Object target) throws Throwable {
        System.out.println(target.getClass().getName() + "的" + method.getName() + "被执行了");
    }
}

```

```java
package com.lixingyu.log;

import org.springframework.aop.AfterReturningAdvice;

import java.lang.reflect.Method;

public class AfterLog implements AfterReturningAdvice {
    @Override
    public void afterReturning(Object returnValue, Method method, Object[] args, Object target) throws Throwable {
        System.out.println("执行了" + method.getName() + "方法，返回结果为" + returnValue);
    }
}

```

在 ApplicationContext.xml 中注册这些 bean

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
                           http://www.springframework.org/schema/aop
                           https://www.springframework.org/schema/aop/spring-aop.xsd">

  <bean id="UserService" class="com.lixingyu.service.UserServiceImpl"/>
  <bean id="Log" class="com.lixingyu.log.Log"/>
  <bean id="AfterLog" class="com.lixingyu.log.AfterLog"/>

  <!--    配置AOP   原生-->
  <aop:config>
    <!--        切入点-->
    <aop:pointcut id="pointcut" expression="execution(* com.lixingyu.service.UserServiceImpl.*(..))"/>
    <!--        执行环绕增加-->
    <aop:advisor advice-ref="Log" pointcut-ref="pointcut"/>
    <aop:advisor advice-ref="AfterLog" pointcut-ref="pointcut"/>
  </aop:config>

</beans>
```

注意需要导入 AOP 的头文件

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
                           http://www.springframework.org/schema/aop
                           https://www.springframework.org/schema/aop/spring-aop.xsd">
</beans>
```

测试：

```java
import com.lixingyu.service.UserService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class MyTest {

    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("ApplicationContext.xml");
        UserService userService = (UserService) context.getBean("UserService");
        userService.add();
    }
}

// 输出
// com.lixingyu.service.UserServiceImpl的add被执行了
// 增加了一个用户
// 执行了add方法，返回结果为null

```

###### 方式二： 自定义类实现

示例自定义类：

```java
package com.lixingyu.diy;

public class DiyPointCut {

    public void before() {
        System.out.println("方法执行前");
    }

    public void after() {
        System.out.println("方法执行后");
    }
}
```

ApplicationContext.xml

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
                           http://www.springframework.org/schema/aop
                           https://www.springframework.org/schema/aop/spring-aop.xsd">


  <bean id="UserService" class="com.lixingyu.service.UserServiceImpl"/>
  <bean id="Log" class="com.lixingyu.log.Log"/>
  <bean id="AfterLog" class="com.lixingyu.log.AfterLog"/>


  <!--    方式二-->
  <bean id="diy" class="com.lixingyu.diy.DiyPointCut"/>

  <aop:config>
    <!--        自定义切面，ref引用对用的类-->
    <aop:aspect ref="diy">
      <!-- 切入点 -->
      <aop:pointcut id="point" expression="execution(* com.lixingyu.service.UserServiceImpl.*(..))"/>
      <!-- 环绕方式 -->
      <aop:before method="before" pointcut-ref="point"/>
      <aop:after method="after" pointcut-ref="point"/>
    </aop:aspect>
  </aop:config>
</beans>
```

###### 方式三：使用注解方式

自定义代理类：

```java
package com.lixingyu.diy;

// 注解方式实现AOP

import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;

@Aspect // 标注这个类为一个切面
public class AnnotationPointCut {

    @Before("execution(* com.lixingyu.service.UserServiceImpl.*(..))")
    public void before() {
        System.out.println("方法执行前");
    }

    @After("execution(* com.lixingyu.service.UserServiceImpl.*(..))")
    public void after() {
        System.out.println("方法执行后");
    }


    // 环绕切入
    // 在环绕增强中，我们可以给定一个参数，代表我们要获取处理切入的点
    @Around("execution(* com.lixingyu.service.UserServiceImpl.*(..))")
    public void around(ProceedingJoinPoint jp) throws Throwable {
        System.out.println("环绕前");
        System.out.println(jp.getSignature()); // 打印签名

        Object proceed = jp.proceed();

        System.out.println("环绕后");
    }
}

// 结果:
// 环绕前
// void com.lixingyu.service.UserService.add()
// 方法执行前
// 增加了一个用户
// 方法执行后
// 环绕后
```

ApplicationContext.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
    http://www.springframework.org/schema/aop
    https://www.springframework.org/schema/aop/spring-aop.xsd">

    <bean id="UserService" class="com.lixingyu.service.UserServiceImpl"/>
    <bean id="Log" class="com.lixingyu.log.Log"/>
    <bean id="AfterLog" class="com.lixingyu.log.AfterLog"/>


<!--    方式三-->
    <bean id="annotationPointCut" class="com.lixingyu.diy.AnnotationPointCut"/>
<!--    开启注解支持-->
    <aop:aspectj-autoproxy/>


</beans>
```

注意要开启注解支持

## 整合 Mybatis

#### jar 包

- 导入 jar 包
  - junit
  - mybatis
  - mysql
  - spring 包
  - aop 支持
  - mybatis-spring 【new】
- 编写测试文件
- 测试

亲测可用的一套,spring-webmvc 版本为 5.3.19

```xml
<dependencies>
  <!-- mysql-connector -->
  <dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.22</version>
  </dependency>
  <!-- spring操作数据库需要 -->
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>5.3.19</version>
  </dependency>
  <!-- AOP织入 -->
  <dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.9.0</version>
    <type>pom</type>
  </dependency>
  <!-- mybatis-spring -->
  <dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis-spring</artifactId>
    <version>2.0.2</version>
  </dependency>
  <!-- mybatis -->
  <!-- https://mvnrepository.com/artifact/org.mybatis/mybatis -->
  <dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.7</version>
  </dependency>
  <!-- lombok 版本不宜太低，容易报错 -->
  <dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.22</version>
  </dependency>
</dependencies>
```

#### mybatis-spring

###### SqlSessionTemplate 实现

1.编写数据源(DataSource)配置

```xml
<!--DataSource-->
<bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
  <property name="driverClassName" value="com.mysql.cj.jdbc.Driver"/>
  <property name="url" value="jdbc:mysql://localhost:3306/myabties?useSSL=true&amp;useUnicode=true&amp;characterEncoding=utf-8&amp;serverTimezone=UTC"/>
  <property name="username" value="root"/>
  <property name="password" value="123456"/>
</bean>
```

2.SqlSessionFactory

```xml
<!--SqlSessionFactory-->
<!--使用mybatis-spring提供的 SqlSessionFactoryBean 对象为mybatis提供配置-->
<!--相当于以前的mybatis全局配置文件-->
<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
  <!--数据源-->
  <property name="dataSource" ref="dataSource"/>
  <!--mybatis全局配置文件的位置-->
  <property name="configLocation" value="classpath:mybatis-config.xml"/>
  <!--***mapper.xml配置文件的位置-->
  <property name="mapperLocations" value="classpath:com/lixingyu/mapper/*.xml"/>
</bean>
```

3.SqlSessionTemplate （[spring-mybatis 官网对 SqlSessionTemplate 的介绍](http://mybatis.org/spring/zh/sqlsession.html##SqlSessionTemplate)）

```xml
<bean id="sqlSession" class="org.mybatis.spring.SqlSessionTemplate">
  <!--只能通过构造器注入，因为SqlSessionTemplate类中没有set方法-->
  <constructor-arg index="0" ref="sqlSessionFactory"/>
</bean>
```

4.需要给接口加实现类

```java
package com.lixingyu.mapper;

import com.lixingyu.pojo.User;
import org.mybatis.spring.SqlSessionTemplate;

import java.util.List;

public class UserMapperImpl implements UserMapper{
    // 创建一个SqlSessionTemplate对象
    private SqlSessionTemplate sqlSession;

    // 因为要注入到spring,需要一个set方法
    public void setSqlSession(SqlSessionTemplate sqlSession) {
        this.sqlSession = sqlSession;
    }

    @Override
    public List<User> selectUser() {
        // 通过这个SqlSessionTemplate对象拿到方法，然后return出去即可
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        return mapper.selectUser();
    }
}

```

5.将接口实现类注册到 spring 中

```xml
<bean id="UserMapper" class="com.lixingyu.mapper.UserMapperImpl">
  <!--将之前注册到spring的SqlSessionTemplate注入到UserMapperImpl的参数中-->
  <property name="sqlSession" ref="sqlSession"/>
</bean>
```

#### 声明式事务

把一组业务当成一个业务来做,要么都成功,要么都失败!
确保数据一致性的问题.

事务的 ACID 原则

- 原子性
- 一致性
- 隔离性
  - 多个事务可能操作同一个资源,防止数据损坏
- 持久性
  - 事务一旦提交,无论系统发生什么事情,结果都不会被影响.被持久化保存.

spring 提供了<tx:advice>为我们处理事务

```xml
<!--配置声明式事务-->
<bean id="transactionManger" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
  <!--这里dataSource即为在xml中配置的mybatis的数据源-->
  <property name="dataSource" ref="dataSource"/>
</bean>

<!--结合AOP实现事务的织入-->
<!--配置事务通知-->
<tx:advice id="txAdvice" transaction-manager="transactionManger">
  <!--给哪些方法配置事务-->
  <!--propagation 配置事务传播特性,有7个选项,一般选择REQUIRED-->
  <tx:attributes>
    <tx:method name="add" propagation="REQUIRED"/>
    <tx:method name="update" propagation="REQUIRED"/>
    <tx:method name="delete" propagation="REQUIRED"/>
    <tx:method name="query" read-only="true"/>
    <tx:method name="*" propagation="REQUIRED"/>
  </tx:attributes>
</tx:advice>

<!--通过AP横切 配置事务切入-->
<aop:config>
  <aop:pointcut id="txPointCut" expression="execution(* com.lixingyu.mapper.*.*(..))"/>
  <aop:advisor advice-ref="txAdvice" pointcut-ref="txPointCut"/>
</aop:config>
```
