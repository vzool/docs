# What is Directus

Directus is a suite of software for managing agnostic content that can be connected anywhere. That's quite a broad description, so let's take a look at a few examples to get a better idea of what it means.

## Project Examples

* **Websites** – You might be managing simple text and images for a personal blog, massive amounts of syndicated content for a network of enterprise sites, or highly customized user account data for a complex webapp service; Directus has it covered.
* **Native Apps** – Phone apps have similar needs to websites, but often need to receive content in a different format. Directus stores and delivers all content _agnostically_ so that's not a problem.
* **Kiosks** – Ever notice those kiosks at airports or restaurants? Flight information and menus are content too (sometimes called data) and it can all be managed in Directus.
* **Digital-Signage** – From the small screens in the back of taxis to huge digital billboards towering over highways, the text, images, and videos on those displays is all content that needs to be managed. Directus can easily handle that.
* **Internet-of-Things (IoT) Devices** – The internet-of-things is the umbrella term for all the world's connected "smart" devices. Refrigerators, washing machines, security cameras—even lights and thermostats. If it's considered a smart device then chances are it's sending or recieving data somewhere. Somewhere like Directus.
* **Wearables** – Smart watches, fitness trackers, and GPS bracelets all typically stores data in the "Cloud" (a fancy word for the internet). Whether mapping your hike or tracking the number of steps taken along the way, each of those devices shares its data with a service like Directus.
* **Internal Tools** – Perhaps you just need an internal productivity tool that doesn't connect anywhere. Project management software, to-do lists, inventory systems, time trackers, note taking, etc. Directus is a flexible alternative to spreadsheets and proprietary monthly services.
* **Combined Systems** – Perhaps your project includes several of the above platforms. Why setup, learn, and pay for multiple specific systems that can't share content with each other? Instead, manage all your content in one place, then simply connect it anywhere and everywhere. Now data for your customers, sales, payroll, scheduling, etc. all live together, which allows for very revealing connections to be made. Synergy!

## Key Concepts

There are many concepts that make Directus unique, and several terms that we use to describe those concepts. Below is a quick primer to better understand what is meant by some of the .

### Framework

Directus isn't an all-in-one cookie-cutter solution. It strives to be a simple, flexible, transparent, and powerful _tool_ that you can seamlessly add to your existing toolkit.

### Your Data

**"Pure"** means that Directus does not alter your data or store it in a proprietary way. All system data is stored elsewhere, never commingled.

**"Agnostic"** means that the your data is compatible with any type of platform or device, not specific to websites and HTML.

**"Transparent"** means that Directus doesn't hide or obfuscate (obscure) your data in an attempt to _lock_ you to our platform.

**"Open"** means that the Directus codebase itself is publicly available, so you can audit your data's activity end-to-end. This is not a closed or black-box solution.

### API vs App

The Directus API (Application Programming Interface) is the "engine" of Directus. It is layered on-top of your database to provide an easy way for different applications to communicate with the data inside.

The Directus App (Application) is how _humans_ interact with the API. It wraps the API with a friendly interface so that users can manage content in their web browser.

### Multitenancy

The Directus suite of software has been designed for projects both simple and complex, both small and enormous. To accomodate this, you can install the App and API individually or use the bundled version which combines both. This decoupled approach allows for a single App to manage any number of APIs, even if they are located on different servers. Additionally, each API supports multiple databases, so you only need to install a single instance for all your projects and deployment environments.

:::tip
You can use our always up-to-date hosted app to connect to any publicly accessible Directus API: [https://directus.app](https://directus.app/)
:::

![Suite Overview](./img/Overview.png)

### Database Mirroring

One of the most unique concepts of Directus is that it aims to be a pure SQL database wrapper. When you create Directus collections, fields, defaults, datatypes... you are actually just creating tables, columns, etc in a custom SQL database. That means you do not need to shoe-horn your project architecture into a predefined CMS schema. **You are in total control of your data, including how it's organized, stored, and optimized.**

More importantly, all the Directus "stuff" such as settings, revisions, preferences, permissions, comments, etc... are all stored in completely separarate tables from your content. This decoupled approach means that you can easily install Directus on top of an existing SQL database to get started. Or, if you ever want to take your data elsewhere, just delete those Directus system tables and your content remains in a pristine SQL database with no hint that Directus was ever there. **You data is always completely pure and portable so you can come and go from Directus at will.**

#### What is a Database?

A database is like a very powerful spreadsheet that can store all sorts of information, such as: text, numbers, dates, images, raw data, and more. Directus has been built to support the most common type of relational database: SQL (Structured Query Language). If you're confused by "relational", it just means that you can add an item in the database once, and then relate it to many other items. For example, you could relate a single author to all of their books instead of typing the same author's name into each of their books.

#### Database vs Directus

There are many advantages to wrapping your database with Directus, below we outline several of the most notable:

* **Presentation** – Engineers love that databases are essentially a grid of raw data. What you see is what you get. But a thin veil of aesthetics never hurt any one... in fact it makes managing data a lot easier in certain cases as we'll see below.
* **Relational Data** – Working with primary keys is time consuming and it's easy to forget what you're looking at when you're nested 3-4 levels deep. Directus handles all those native relationships, but gives you context about each item you're working on. So you'll see `John Smith – NYC OFfice (Accounting) ` instead of `64009`.
* **Managing Assets** – Sure, you can store BLOBs of file data directly in the database, but you typically don't even get a thumbnail preview... just code. And it takes a script/app to get files there in the first place. Directus lets you see all of your files, manage assets in the filesystem, or even save them to the cloud service of your choice. It also has helpful tools for cropping and resizing.
* **Safety** – It's way too easy to irreversibly damage a raw database. Have you ever accidentally edited a column and lost data? Truncated a table with millions of records? Deleted a whole database? No one should endure the stressful moments of trying to figure out how recent your latest backup is. Directus keeps all item updates (full and delta), lets you hide dangerous features based on the user's proficiency, and gives appropriate warnings for attempted actions. For example, if you want to delete a collection, you'll need to first confirm your intentions by typing the collection name in.
* **Accountability** – A database is an excellent single-source-of-truth, but it doesn't track edits and store all deltas for a comprehensive revision history. For all updates, Directus knows what was changed, when, and by who — so you have a full history from creation to publish.
* **Permissions** – Database users have decent CRUD permissions, but lack the granularity of a full-featured system. For example: column read blacklist based on the record's status and the when created by other user's within the permission's role. Complex? Yes. But very powerful.
* **Accessability** – Directus adds a comprehensive API wrapper to your database that is dynamically based on your custom schema. It also includes many SDKs for specific languages so you can get connected to your data even faster. Oh, and of course you can always connect to the database directly and completely bypass Directus. That's near impossible with other CMS because of the proprietary and complex way that they store your data.
