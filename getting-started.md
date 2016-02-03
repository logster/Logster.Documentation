---
layout: page
title: Getting Started
---

### Logster Configuration

Add the following to your app.config or web.config:

    <configSections>
        <section name="logster" type="Logster.Client.LogsterSection, Logster.Client" />
    </configSections>
    
    <logster apiKey="your-api-key" application="Logster.Samples.Web" />

You can find your api key by viewing [your subscription](/Manage/Plan).

### log4net

[Install with NuGet](https://www.nuget.org/packages/Logster.log4net)

<div class="nuget-badge">
    <code>PM> Install-Package Logster.log4net</code>
</div>

#### Configuration

First, [configure logster](#toc-logster-configuration). Then, configure log4net.

    <?xml version="1.0" encoding="utf-8"?>
    <configuration>
      <log4net>
        <appender name="logster" type="Logster.Client.log4net.LogsterAppender, Logster.Client.log4net">
          <layout type="log4net.Layout.PatternLayout">
            <category>Log Category</category>
            <conversionPattern value="%date [%thread] %-5level %logger [%ndc] &lt;%property{auth}&gt; - %message%newline" />
          </layout>
        </appender>
        <root>
          <appender-ref ref="logster" />
        </root>
      </log4net>
    </configuration>

Async configuration with [Log4Net.Async](https://github.com/cjbhaines/Log4Net.Async)

    <?xml version="1.0" encoding="utf-8"?>
    <configuration>
      <log4net>
        <appender name="logster" type="Logster.Client.log4net.LogsterAppender, Logster.Client.log4net">
          <layout type="log4net.Layout.PatternLayout">
            <category>Log Category</category>
            <conversionPattern value="%date [%thread] %-5level %logger [%ndc] &lt;%property{auth}&gt; - %message%newline" />
          </layout>
        </appender>
        <appender name="asyncForwarder" type="Log4Net.Async.AsyncForwardingAppender,Log4Net.Async">
          <appender-ref ref="logster" />
        </appender>
        <root>
          <appender-ref ref="asyncForwarder" />
        </root>
      </log4net>
    </configuration>

#### Usage

See the [console sample](https://github.com/logster/Logster.Samples/tree/master/Logster.Samples.Console) for a complete example. 

    private static void Main(string[] args)
    {
        // load the log4net configuration in app.config
        XmlConfigurator.Configure();
    
        ILog log = LogManager.GetLogger(typeof (Program));
    
        log.Info("Starting up ...");
    
        for (var i = 0; i < 10; i++)
        {
            log.Info(i + "... ");
        }
    
        log.Info("Done.");
    
        // call shutdown to write any pending events in the async queue
        LogManager.Shutdown();
    }

### NLog

[Install with NuGet](https://www.nuget.org/packages/Logster.NLog)

<div class="nuget-badge">
    <code>PM> Install-Package Logster.NLog</code>
</div>

#### Configuration

First, [configure logster](#toc-logster-configuration). Then, configure NLog.

    <?xml version="1.0" encoding="utf-8" ?>
    <nlog throwExceptions="false" internalLogLevel="Off">
        <extensions>
            <add assembly="Logster.Client.NLog" />
        </extensions>
        <targets>
            <target name="logster" type="Logster" category="Log Category" />
        </targets>
        <rules>
            <logger name="*" minlevel="Trace" writeTo="logster" />
        </rules>
    </nlog>

Async configuration with [AsyncWrapper](https://github.com/nlog/NLog/wiki/AsyncWrapper-target)

    <?xml version="1.0" encoding="utf-8" ?>
    <nlog throwExceptions="false" internalLogLevel="Off">
      <extensions>
        <add assembly="Logster.Client.NLog"/>
      </extensions>
      <targets>
        <target xsi:type="AsyncWrapper" name="asyncWrapper" overflowAction="Block">
          <target name="logster" xsi:type="Logster" category="Log Category" />
        </target>
      </targets>
      <rules>
        <logger name="*" minlevel="Trace" writeTo="logster"/>
      </rules>
    </nlog>

#### Usage

See the [web sample](https://github.com/logster/Logster.Samples/tree/master/Logster.Samples.Web) for a complete example. 

    protected void Application_Error(object sender, EventArgs e)
    {
        Exception ex = Server.GetLastError();
        if (ex != null)
        {
            var log = LogManager.GetLogger("Global");
            log.Error(ex);
        }
    }

### Web

[Install with NuGet](https://www.nuget.org/packages/Logster.Web)

<div class="nuget-badge">
    <code>PM> Install-Package Logster.Web</code>
</div>

#### Configuration

[Configure logster](#toc-logster-configuration). No additional configuration is necessary.

#### Usage

See the [web api sample](https://github.com/logster/Logster.Samples/tree/master/Logster.Samples.WebApi) for a complete example.

    private void Log(string text, string user, Uri url)
    {
        var message = new LogMessage
                            {
                                Application = GetType().Assembly.GetName().Name,
                                Category = url.ToString(),
                                Message = text,
                                Severity = Severity.Trace,
                                User = user
                            };
    
        var log = new LogsterWebLog();
        log.LogInBackground(message);
    }

## Documentation

### Samples

Want to see more code? We have sample applications for console, web, api, and more.

[View on GitHub](https://github.com/logster/Logster.Samples)

### API Documentation

Build your own client with our RESTful API. Simply POST your [message](https://api.logster.io/Help/ResourceModel?modelName=LogMessage) to **https://api.logster.io/api/Log** as JSON or XML and include your api key in the **ApiKey** header.

Here's an example request made with Postman:

    POST https://api.logster.io/api/Log HTTP/1.1
    Host: api.logster.io
    Connection: keep-alive
    Content-Length: 399
    Cache-Control: no-cache
    Origin: chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop
    ApiKey: <your api key>
    Content-Type: application/json
    User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36
    Postman-Token: <token>
    Accept: */*
    Accept-Encoding: gzip, deflate
    Accept-Language: en-US,en;q=0.8

    {
      "Exception": "System.ApplicationException: An unhandled widget exception occurred.",
      "Message": "Uh-oh, something happened.",
      "StackTrace": "   at Logster.Web.Api.Areas.HelpPage.App_Start.HelpPageConfig.Register(HttpConfiguration config) in Program.cs:line 42\r\n",
      "Severity": 4,
      "Category": "Widget Designer",
      "Application": "Your Awesome Application",
      "User": "john-doe"
    }

If your POST was successful, the response will have a status code of 200 and will contain the MessageId in the body.

    HTTP/1.1 200 OK
    Cache-Control: no-cache
    Pragma: no-cache
    Content-Type: application/json; charset=utf-8
    Expires: -1
    Server: Microsoft-IIS/10.0
    X-AspNet-Version: 4.0.30319
    X-Powered-By: ASP.NET
    Date: Thu, 21 Jan 2016 03:49:47 GMT
    Content-Length: 48

    {"MessageId":"7892"}

If something is missing or incorrect in the request, you'll get an error response. Note the 400 status code and ModelState in the body.

    HTTP/1.1 400 Bad Request
    Cache-Control: no-cache
    Pragma: no-cache
    Content-Type: application/json; charset=utf-8
    Expires: -1
    Server: Microsoft-IIS/10.0
    X-AspNet-Version: 4.0.30319
    X-Powered-By: ASP.NET
    Date: Thu, 21 Jan 2016 03:57:04 GMT
    Content-Length: 172

    {
        "Message":"The request is invalid.",
        "ModelState":
        {
            "message.Message":["The Message field is required."],
            "message.Severity":["The field Severity must be between 0 and 6."]
        }
    }

See the [API Help Page](https://api.logster.io/Help) for more information.