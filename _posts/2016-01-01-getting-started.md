---
title: Getting Started
---

First, install a logster.io framework nuget package:

<ul>
    <li><a href="{{site.baseurl}}/log4net">log4net</a></li>
    <li><a href="{{site.baseurl}}/nlog">NLog</a></li>
    <li><a href="{{site.baseurl}}/web">Web</a></li>
</ul>

Then, add the following to your app.config or web.config:

    <configSections>
        <section name="logster" type="Logster.Client.LogsterSection, Logster.Client" />
    </configSections>
    
    <logster apiKey="your-api-key" application="Logster.Samples.Web" />

You can find your api key by viewing [your subscription](https://portal.logster.io/Manage/Plan).

Finally, use your logging framework as you normally would and start seeing your logs in <a href="https://portal.logster.io">logster.io</a>
