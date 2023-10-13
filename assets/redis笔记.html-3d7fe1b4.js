import{_ as e,p as i,q as d,a1 as a}from"./framework-204010b2.js";const l="/note/assets/redis-1-1028bf47.png",s={},n=a(`<h2 id="centos7-redis5-0-2-下载安装" tabindex="-1"><a class="header-anchor" href="#centos7-redis5-0-2-下载安装" aria-hidden="true">#</a> centos7 redis5.0.2 下载安装</h2><p>用 wget 直接下载 properties</p><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code><span class="token key attr-name">wget</span> <span class="token value attr-value">http://download.redis.io/releases/redis-5.0.2.tar.gz</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>移动到 /opt/mysoftwares 下，用解压命令解压到<code>/opt</code>目录下（/opt/mysoftwares 目录就是用来存放各种安装包的，只是为了好整理，解压要解压到<code>/opt</code>下）</p><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code><span class="token key attr-name">tar</span> <span class="token value attr-value">-zxvf redis-5.0.2.tar.gz -C /opt</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>确保自己的环境有 jcc 编译器，可以编译 c 语言程序，然后执行</p><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code>make
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>编译程序。 编译完成后，使用<code>make install</code>命令将 redis 的指令建立软链接。这样就可以全局使用 redis 相关命令了。</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>make install
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><hr><h2 id="启动-redis" tabindex="-1"><a class="header-anchor" href="#启动-redis" aria-hidden="true">#</a> 启动 redis</h2><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code><span class="token comment">## 前台启动，占用命令行，不推荐</span>
redis-server

<span class="token comment">## 后台启动 【推荐】</span>
<span class="token key attr-name">redis-server</span> <span class="token value attr-value">&amp;</span>

<span class="token comment">## 未来修改了配置文件，需要指定配置文件后台启动</span>
<span class="token key attr-name">redis-server</span> <span class="token value attr-value">redis.conf &amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>redis 默认端口 6379，在 redis.conf 中可以修改</p><hr><h2 id="关闭-redis" tabindex="-1"><a class="header-anchor" href="#关闭-redis" aria-hidden="true">#</a> 关闭 redis</h2><ol><li>直接 kill 进程</li></ol><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code><span class="token key attr-name">kill</span> <span class="token value attr-value">-9 pid</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>用 redis-cli【推荐】</li></ol><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code><span class="token key attr-name">redis-cli</span> <span class="token value attr-value">shutdown</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><hr><h2 id="查看-redis-进程" tabindex="-1"><a class="header-anchor" href="#查看-redis-进程" aria-hidden="true">#</a> 查看 redis 进程</h2><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code><span class="token key attr-name">ps</span> <span class="token value attr-value">-ef|grep redis</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+l+`" alt="image.png"></p><hr><h2 id="redis-客户端" tabindex="-1"><a class="header-anchor" href="#redis-客户端" aria-hidden="true">#</a> redis 客户端</h2><p>用来连接 redis 服务，向 redis 服务端发送命令，并且显示 redis 服务处理结果 连接 redis:</p><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code><span class="token comment">## 默认连接127.0.0.1(本机)的6379端口</span>
redis-cli

<span class="token comment">## 连接其他端口</span>
<span class="token key attr-name">redis-cli</span> <span class="token value attr-value">-p 端口号</span>

<span class="token comment">## 连接指定ip主机上的指定端口的redis服务，如果有设置密码，带 -a 【密码】</span>
<span class="token key attr-name">redis-cli</span> <span class="token value attr-value">-h ip地址 -p 端口号 -a 密码</span>

<span class="token comment">## eg: 【注意】在云服务器中要外界访问到redis服务，ip需要是是内网ip，</span>
<span class="token comment">## 用Java连接的时候用公网ip</span>
<span class="token key attr-name">redis-cli</span> <span class="token value attr-value">-p 6379 -h 10.0.4.17 -a yourpassword</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="退出客户端" tabindex="-1"><a class="header-anchor" href="#退出客户端" aria-hidden="true">#</a> 退出客户端</h4><p>在客户端中执行<code>exit</code>或者<code>quit</code>命令</p><hr><h2 id="redis-基本知识" tabindex="-1"><a class="header-anchor" href="#redis-基本知识" aria-hidden="true">#</a> redis 基本知识</h2><ol><li><code>redis-benchmark</code>命令 : 测试 redis 并发能力，了解即可。</li><li>连接客户端后，<code>ping</code>查看 redis 是否正常连接，返回 PONE 即正常。</li><li>连接客户端后，<code>info</code>查看 redis 服务器的统计信息。</li><li>redis 的数据库实例：</li></ol><p>redis 中的数据库实例只能 redis 创建和维护。 默认情况下，redis 数据库中创建了 16 个数据库。编号 0~15，可以通过配置文件指定创建多少个数据库。 默认连接 0 号数据库。可以使用<code>select index</code>切换数据库</p><ol start="5"><li>查看当前数据库中 key 的数量<code>dbsize</code></li><li>查看当前数据库中所有的 key <code>keys *</code></li><li>清空数据库实例：<code>flushdb</code></li><li>清空所有数据库中的实例：<code>flushall</code></li><li>查看 redis 中的配置信息：<code>config get *</code></li></ol><hr><h2 id="redis-的-5-种数据结构" tabindex="-1"><a class="header-anchor" href="#redis-的-5-种数据结构" aria-hidden="true">#</a> redis 的 5 种数据结构</h2><ol><li>字符串 ： （单 key 单 value）</li><li>list 列表：（单 key 多 value，且有顺序）</li><li>set 集合：（单 key 多 value，无序）</li><li>hash 表：（类似对象：student: id : 1000, name : zhangsan , age : 20）</li><li>zest： （有序集合）</li></ol><hr><h2 id="redis-操作命令" tabindex="-1"><a class="header-anchor" href="#redis-操作命令" aria-hidden="true">#</a> redis 操作命令</h2><h4 id="key-相关" tabindex="-1"><a class="header-anchor" href="#key-相关" aria-hidden="true">#</a> key 相关</h4><ul><li><code>keys parttern</code> 查看数据库中符合通配的数据。 <ul><li><ul><li><pre><code>匹配\`多个\`字符
</code></pre></li></ul></li><li>? 匹配<code>1</code>个字符</li><li>[ ] 匹配<code>中括号中的其中一个</code>字符</li></ul></li><li><code>exists keys</code> 判断 key 在数据库中是否存在。 <ul><li>返回 1 存在，0 不存在</li><li>判断多个，中间空格隔开，返回存在的 key 的个数</li></ul></li><li><code>move key index</code> 将当前库的某个 key-value 移动到另一个库。</li><li><code>ttl（time to live）</code> 查看指定 key 的剩余生存时间。 <ul><li>key 不存在，返回 -2</li><li>没设置时间，返回 -1</li></ul></li><li><code>expire key second</code> 设置 key 的最大超时时间，单位：秒。</li><li><code>type key</code> 查看指定 key 的数据类型。</li><li><code>rename key newkey</code> 重命名 key。</li><li><code>del k1 k2 k3 ...</code> 删除 key，返回实际删除的 key 的数量。</li></ul><hr><h4 id="string-类型相关" tabindex="-1"><a class="header-anchor" href="#string-类型相关" aria-hidden="true">#</a> string 类型相关</h4><ul><li><code>set key value</code> 将 string 类型保存到 redis 已存在会覆盖。</li><li><code>get key</code> 获取 value。</li><li><code>append key appendValue</code> 追加字符串，返回追加之后的字符串长度，key 不存在，则相当于 set。</li><li><code>strlen key</code> 获取字符串长度。</li><li><code>incr</code> 将字符串数值进行+1 运算，不存在则设置 key，初始值为 0，再+1。</li><li><code>decr</code> 将字符串数值进行-1 运算，不存在则设置 key，初始值为 0，再 -1。</li><li><code>incrBy key offset</code> 加 n，不存在则设置 key，初始值为 0，再 +n。</li><li><code>decrBy key offset</code> 减 n，不存在则设置 key，初始值为 0，再 -n。</li><li><code>getrange key startIndex endIndex</code> 获取 startindex 到 endIndex 的子串，下标从 0 开始，源数据不变，支持负数索引。</li><li><code>setrange key startIndex string</code> 覆盖从 startindex 开始的子串，下标从 0 开始，源数据不变，支持负数索引。</li><li><code>setex key second value</code> 设置字符串的同时设置最大生命周期。</li><li><code>setnx key value</code> 不覆盖的设置字符串。</li><li><code>mset key1 value1 key2 value2 ...</code>批量设置 key-value。</li><li><code>mget key1 key2 ...</code>批量获取 key-value。</li><li><code>msetnx key1 value1 key2 value2 ...</code>不覆盖的批量设置，只要有有一个已经存在，则全部放弃设置。</li></ul><hr><h4 id="list-类型相关" tabindex="-1"><a class="header-anchor" href="#list-类型相关" aria-hidden="true">#</a> list 类型相关</h4><ul><li><code>lpush key value1 value2 value3 ...</code> 左侧插入</li><li><code>rpush key value1 value2 value3 ...</code> 右侧插入</li><li><code>lpushx key value1 value2 value3 ...</code> 不覆盖左侧插入</li><li><code>rpushx key value1 value2 value3 ...</code> 不覆盖右侧插入</li><li><code>lindex key index</code> 查看第 index 个数据</li><li><code>lrange key start end</code> 切片查看，不改变源数据</li><li><code>lpop key</code> 从列表中移除左侧第一个元素</li><li><code>rpop key</code> 从列表中移除右侧第一个元素</li><li><code>llen key</code> 获取列表长度</li><li><code>lrem key count value</code> 移除列表中指定位置的指定个元素 <ul><li>count &gt; 0 移除 count 左边的所有 value</li><li>count = 0 移除 count 右边的所有 value</li><li>count = 0 移除所有 value</li></ul></li></ul><hr><h4 id="set-类型相关" tabindex="-1"><a class="header-anchor" href="#set-类型相关" aria-hidden="true">#</a> set 类型相关</h4><ul><li><code>sadd key member1 member2 member3 ...</code> 向 set 集合中添加指定个成员</li><li><code>scard key</code>查看指定 set 集合中的成员个数</li><li><code>sdiff key1 key2 ...</code>比较 set 集合之间的差异，以前面为准 <ul><li>eg: sadd set1 1 2 3 4</li><li><pre><code>      sadd set2 1 2 3 4 5
</code></pre></li><li><pre><code>      sadd set3 5 4 3 2 1
</code></pre></li><li>如果执行<code>sdiff set1 set2</code>，则返回空集合</li><li>如果执行<code>sdiff set2 set1</code>，则返回 <code>&quot;5&quot;</code></li><li>如果执行<code>sdiff set2 set3</code>，则返回空集合</li></ul></li><li><code>sinter key1 key2 key3 ...</code> 返回这些集合的交集</li><li><code>sinterstore storeName key1 key2</code> 返回集合的交集并且放到 storeName 里</li><li><code>sismember key member</code> 判断这个 member 是否在 key 这个 set 集合中</li><li><code>smembers key</code> 返回当前集合中的所有成员</li><li><code>smove source distination member</code> 将 source 这个 set 集合中的 mebmber 这个成员移动到 distination 这个 set 集合中</li><li><code>spop key count</code> 移除 set 集合中随机 count 个成员，count 默认为 1</li><li><code>srandmember key count</code> 随机返回 count 个集合中的成员，不影响原数据</li><li><code>srem key member1 member2 member3 ...</code> 删除指定成员</li><li><code>sunion key1 key2 key3 ...</code> 返回集合的并集</li></ul><hr><h4 id="hash-表类型相关" tabindex="-1"><a class="header-anchor" href="#hash-表类型相关" aria-hidden="true">#</a> hash 表类型相关</h4><ul><li><code>hset key filed value</code> 将 key 的 filed 设置为 value</li><li><code>hget key filed</code> 获取指定 key 的指定 filed 的值</li><li><code>hgetall key</code> 获取 key 的所有 filed 和 value 值</li><li><code>hsetnx key filed value</code> 不覆盖的设置 filed 的 value</li><li><code>hmset key filed1 value2 filed2 value2</code> 存在 filed 就覆盖，不存在就创建</li><li><code>hlen key</code> 获取指定 key 有多少个键值对</li><li><code>hexists key filed</code> 指定 key 的指定 filed 是否存在</li><li><code>hkeys key</code> 返回 key 的所有 filed</li><li><code>hvals key</code> 返回 key 的所有 value</li><li><code>hincrby key filed count</code> 将数字类型的 value 加 count</li><li><code>hdel key filed1 value1 filed2 value2 ...</code> 删除指定 key 的多个指定 filed 的值，不存在就忽略</li></ul><hr><h4 id="zset-类型相关" tabindex="-1"><a class="header-anchor" href="#zset-类型相关" aria-hidden="true">#</a> zset 类型相关</h4><ul><li><code>zadd key scope value scope value</code> 给指定的 key 中添加分数为 scope 的 value，按照 scope 排序</li><li><code>zrange key startIndex endIndex</code> 获取从 startIndex 到 endIndex 的值</li><li><code>zcard key</code> 查看指定 zset 中的元素个数</li><li><code>zrank key member</code> 查看指定成员的下标</li><li><code>zscore key member</code> 查看指定成员的 scope 分数</li><li><code>zrangebyscore key min max</code> 获取 zset 中指定分数区间的值</li><li><code>zrevrange key min max</code> 倒序输出指定范围内的值</li><li><code>zrevrangebyscope key max min</code> 倒序以 scope 输出指定范围内的值</li><li><code>zrem key member1 member2 ...</code> 删除一个或多个 zset 中的成员</li><li><code>zremrangebyscore key min max</code> 删除指定区间内的值，以分数排序</li><li><code>zremrangebyrank key min max</code> 删除指定区间内的值，以下标排序</li><li><code>zunionstore destination key1 key2 ...</code> 求这些 key 的并集并放到 destination 这个 zset 中</li><li><code>zinterstore destination key1 key2 ...</code> 求这些 key 的交集并放到 destination 这个 zset 中</li></ul><hr><h2 id="redis-配置文件" tabindex="-1"><a class="header-anchor" href="#redis-配置文件" aria-hidden="true">#</a> redis 配置文件</h2><ul><li>redis 安装好后，在 radis 的安装根目录下有默认为 redis.conf 的配置文件。</li><li>更改配置文件后，再次启动 redis 必须指定配置文件</li></ul><h4 id="redis-关于网络的设置" tabindex="-1"><a class="header-anchor" href="#redis-关于网络的设置" aria-hidden="true">#</a> redis 关于网络的设置</h4><ul><li><code>port</code> 指定 redis 服务所使用的端口，默认使用 6379</li><li><code>bind</code> 配置客户端连接 redis 服务时，所能使用的 ip 地址，默认可以使用 redis 服务所在主机上任何一个 ip，一般在开发中，都会配置一个真实 ip。</li></ul><p>修改了 ip 和端口后，开启和关闭时都需要指定 ip 和端口</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 开启</span>
redis<span class="token operator">-</span>server <span class="token operator">-</span>h <span class="token number">192.168</span><span class="token number">.1</span><span class="token number">.1</span> <span class="token operator">-</span>p <span class="token number">6380</span>

<span class="token comment">// 关闭</span>
redis<span class="token operator">-</span>cli <span class="token operator">-</span>h <span class="token number">192.168</span><span class="token number">.1</span><span class="token number">.1</span> <span class="token operator">-</span>p <span class="token number">6380</span> shutdown
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>tcp-keepalive</code> 连接保活策略。</li></ul><hr><h4 id="常规配置" tabindex="-1"><a class="header-anchor" href="#常规配置" aria-hidden="true">#</a> 常规配置</h4><ul><li><code>loglevel</code>配置日志级别，符合 log4j 日志级别，开发一般都是 debug 级别</li><li><code>logfile</code> 指定日志文件</li><li><code>databases</code> 创建数据库实例的个数</li></ul><hr><h4 id="安全配置【不常用】" tabindex="-1"><a class="header-anchor" href="#安全配置【不常用】" aria-hidden="true">#</a> 安全配置【不常用】</h4><ul><li><code>protected-mode</code> 安全模式开关</li><li><code>requirepass</code> 设置密码，必须在 protected-mode 为 yes 时才会生效，一般不用 <ul><li>开启后，连接需要加 <code>-a password</code></li></ul></li></ul><hr><h2 id="redis-持久化" tabindex="-1"><a class="header-anchor" href="#redis-持久化" aria-hidden="true">#</a> redis 持久化</h2><p>redis 是内存数据库，在服务器宕机后，所有的数据都会丢失。所以 redis 提供持久化操作，在适当的时机，采用适当的策略，将数据写入磁盘，下次再加载到内存中。</p><h4 id="rdb-策略【redis-默认开启】" tabindex="-1"><a class="header-anchor" href="#rdb-策略【redis-默认开启】" aria-hidden="true">#</a> RDB 策略【redis 默认开启】</h4><p>在指定时间间隔内，redis 服务在指定时间内，执行指定次数的写操作，会触发一次持久化操作，将数据持久化到磁盘上，默认：1 分钟改变一万次，或者 5 分钟改变十次，或者 15 分钟内改变了一次，会触发持久化操作。</p><ul><li>配置文件中<code>save &lt;second&gt; &lt;change&gt;</code> 是修改策略的</li><li>配置文件中<code>dbfilename location</code> 持久化操作存储在那个文件下，默认为 dump.rdb</li></ul><hr><h4 id="aof-策略" tabindex="-1"><a class="header-anchor" href="#aof-策略" aria-hidden="true">#</a> AOF 策略</h4><p>采用操作日志的方式记录每一次写操作，每次启动 redis 时，将文件中的操作执行，达到恢复数据的目的。效率相较于 RDB 较低，redis 默认不开启</p><ul><li><code>appendonly</code> 开启 AOF 策略，yes / no</li><li><code>appendfilename</code> AOF 保存文件名</li><li><code>appendfsync</code> AOF 异步持久化策略 <ul><li>always:同步持久化，每次发生数据变化会立刻写入到蓝盘中。性能较差但数据完整性比较好(慢，安全)</li><li>everysec:出厂默认推荐，每秒异步记录一次（默认值）</li><li>no:不即时同步，由操作系统决定何时同步。</li></ul></li><li><code>no-appendfsync-on-rewrite</code> 重写时是否可以运用 appendsync,默认 no,可以保证数据的安全性。</li><li><code>auto-aof-rewrite-percentage</code> 设置重写的基准百分比</li><li><code>auto-aof-rewrite-min-size</code> 设置重写的基准值</li></ul><hr><h2 id="redis-事务" tabindex="-1"><a class="header-anchor" href="#redis-事务" aria-hidden="true">#</a> redis 事务</h2><p>redis 事务不能保证全部原子性。当事务在压入队列中就发生了错误，此时执行事务时事务队列中所有命令都不会执行，但在队列执行过程中法伤错误，则只会影响那一条命令的结果，不会取消全部命令的执行，这样就无法办证事务的原子性。</p><ul><li><code>multi</code> 用来标记一个事务的开始，执行命令后，将接下来执行的所有命令放到事务队列中，等待执行。</li><li><code>exec</code> 用来执行事务队列中所有的命令。</li><li><code>discard</code> 清除所有已经压入队列中的事务，并且结束当前事务。</li><li><code>watch key1 key2 ...</code> 监控这些 key，当事务在执行过程中，这些 key 发生了变化，则放弃执行事务。</li><li><code>unwatch</code> 放弃监控和所有的 key</li></ul><hr><h2 id="redis-消息发布与订阅【了解即可】" tabindex="-1"><a class="header-anchor" href="#redis-消息发布与订阅【了解即可】" aria-hidden="true">#</a> redis 消息发布与订阅【了解即可】</h2><p>redis 客户端订阅频道，消息发布者将消息发到指定频道上，所有订阅了该频道的客户端都可以接收到消息，实现客户端之间的通信。</p><ul><li><code>subscribe channel1 clannel2 ...</code> 订阅一个或多个频道</li><li><code>publish channel</code> 向指定频道发布消息</li><li><code>psubscribe channel1 clannel2 ...</code> 订阅一个或多个频道，支持通配符</li></ul><hr><h2 id="redis-主从复制" tabindex="-1"><a class="header-anchor" href="#redis-主从复制" aria-hidden="true">#</a> redis 主从复制</h2><p>主少从多，主写从读，读写分离，主写同步复制从。</p><p>模拟多台主机的多个 redis 服务：</p><ol><li>复制三份 redis.conf 分别叫：redis6379.conf redis6380.conf redis6381.conf</li><li>分别修改对应配置文件的 port，pidfile，logfile，dbfilename 不同</li><li>分别用三个 redis 配置文件在不同端口启动三个 redis 服务</li></ol>`,93),r=[n];function c(o,t){return i(),d("div",null,r)}const u=e(s,[["render",c],["__file","redis笔记.html.vue"]]);export{u as default};
