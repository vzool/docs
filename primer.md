# Directus Primer

## Overview

The Directus suite of software has been designed for projects both simple and complex. To accomodate this, you can install the App and API individually or use the bundled version which combines both. This decoupled approach allows for a single App to manage any number of APIs, even if they are located on different servers. Additionally, the API supports multiple deployment environments, so only need to install a single instance for all your project databases.

![Suite Overview](./img/Overview.png)

## Framework

Directus isn't an all-in-one cookie-cutter solution. It strives to be a simple, flexible, transparent, and powerful _tool_ that you can seamlessly add to your existing toolkit.

## Database Wrapper

One of the several unique concepts of Directus is that it aims to be a pure SQL database wrapper. When you create Directus collections, fields, defaults, datatypes... you are actually just creating tables, columns, etc in a custom SQL database. That means you do not need to shoe-horn your project architecture into a predefined CMS schema. **You are in total control of your data, including how it's organized, stored, and optimized.**

More importantly, all the Directus "stuff" such as settings, revisions, preferences, permissions, comments, etc... are all stored in completely separarate tables from your content. This decoupled approach means that you can easily install Directus on top of an existing SQL database to get started. Or, if you ever want to take your data elsewhere, just delete those Directus system tables and your content remains in a pristine SQL database with no hint that Directus was ever there. **You data is always completely pure and portable so you can come and go from Directus at will.**

### Database vs Directus

There are many differences between using a vanilla database or using a vanilla database wrapped with Directus. Below we outline several of the most notable advantages.

#### Presentation

Engineers love that databases are essentially a grid of raw data. What you see is what you get. But a thin veil of aesthetics never hurt any one... in fact it makes managing data a lot easier in certain cases as we'll see below.

#### Relational Data

Working with primary keys is time consuming and it's easy to forget what you're looking at when you're nested 3-4 levels deep. Directus handles all those native relationships, but gives you context about each item you're working on. So you'll see `John Smith – NYC OFfice (Accounting) ` instead of `64009`.

#### Managing Assets

Sure, you can store BLOBs of data directly in the database, but it takes a script/app to get that there in the first place. Directus lets you manage assets in the filesystem or on the cloud service of your choice. It also has helpful tools for cropping and resizing.

#### Safety

It's absurdly easy to irreversibly damage a raw database. Have you ever accidentally edited a column and lost data? Truncated a table with millions of records? Deleted a whole database? No one should endure the stressful moments when you try to figure out how recent your latest backup is.

Directus keeps all item edits (full and delta), let's you hide dangerous features based on the user's proficiency, and gives appropriate warnings for attempted actions. For example, if you want to delete a collection, you'll need to confirm your intentions by typing the collection name in.

#### Accountability

A database is an excellent single-source-of-truth, but it doesn't track edits and store all deltas for a comprehensive revision history. For all updates, Directus knows what was changed, when, and by who — so you have a full history from creation to publish.

#### Permissions

Database users have decent CRUD permissions, but lack the granularity of a full-featured system. For example: column read blacklist based on the record's status and the when created by other user's within the permission's role. Complex? Yes. But very powerful.

#### Accessability

Directus adds a comprehensive API wrapper to your database that is dynamically based on your custom schema. It also includes many SDKs for specific languages so you can get connected to your data even faster. Oh, and of course you can always connect to the database directly and completely bypass Directus. That's near impossible with other CMS because of the proprietary and complex way that they store your data.

