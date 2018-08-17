---
sidebar: auto
---

# User Guide

## What is Directus
Directus is a suite of software for managing content that can be connected anywhere. Let's take a look at a few examples to get a better idea what that means.

### Websites

You might be managing simple text and images for a personal blog, massive amounts of syndicated content for an enterprise site, or highly customized user account data for a complex webapp service.

### Native Apps

Phone apps have similar needs to websites, but often need to receive content in a different format. Directus stores and delivers all content _agnostically_ so that's not a problem.

### Kiosks

Ever seen those kiosks at airports or restaurants? That's right, flight information and menus are content too (sometimes called data) and it can also be managed in Directus.

### Digital-Signage

From small screens in the back of taxis to huge digital billboards towering over highways. The text, images, and videos on those displays is all content that needs to be managed. Directus!

### Internet-of-Things (IoT) Devices

Not just a buzzword any more, the internet-of-things is the umbrella term for all the world's connected "smart" devices. Refrigerators, washing machines, security cameras—even lights and thermostats. If it's considered a smart device then chances are it's sending or recieving data somewhere. Somewhere like Directus.

### Wearables

Smart watches, fitness trackers, and GPS bracelets all typically stores data in the "Cloud" (a fancy word for the internet). Whether mapping the route of your hike or tracking the number of steps taken along the way, each of those devices shares its data with a service like Directus.

### Combined Systems

Perhaps your project includes several of the above platforms. Why setup, learn, and pay for multiple specific systems that can't share content with each other? Instead, manage all your content in one place, then simply connect it anywhere and everywhere. Now data for your customers, sales, payroll, scheduling, etc all live in one place, which allows for very revealing connections to be made. Synergy!

## Login

![Login with SSO](./img/directus-login-with-sso.png)

This is probably the first Directus page you'll see, so let's learn a bit more about what you can do here. First off, Directus uses your email address instead of a username, so there's one less thing to forget. Simply enter your email address, and type in your Directus password.

::: warning
Warning: Directus securely encrypts all passwords, so there is no reason to share that information with anyone.
:::

::: tip
You can see which version of the Directus App you're using by hovering over the "Powered by Directus" text at the bottom of the page.
:::

### Changing Projects

If Directus has been configured to connect to multiple projects then you'll see a dropdown on the login form. You can use this to select a specific project to log in to, or in some cases to type/paste a project link. 

::: tip
Remember, your account passwords may be different on separate projects, even if they use the same email address.
:::

### Single Sign-On

Next to the default secure login, Directus allows you to use several external services as means of authentication.

When [the system has been configured to allow you to login with external services](#), the logos of these services will show up on the login form.

Clicking one of these icons will take you to a secure login page of the service you chose. Directus will allow you to login with your external account as long as it's using the same email address as your user account in Directus.

### Forgot password

Your password is securely encrypted, so no one can remind you what it is if you forget. Instead, click on the "Forgot Password" link and enter the email address you use to log in. Directus will then send you an email with a temporary reset link, simply click on that link or paste it into your browser to set your password.

## Overview

@TODO: screenshot of interface

### Header

The header bar will show you where you currently are in the system and will provide you with a set of actions you can perform on the current page. Most of the times, these actions will be related to managing item(s), like saving, deleting, or modifying the selection.

### Navigation Sidebar

The navigation sidebar shows you links to your collections, bookmarks, and extensions. This sidebar is accessible in all pages in the system.

#### Logo & Loading indicator

Everytime the application is working on something—like saving or retrieving items—the logo in the top left will transform into a loading indicator. 

#### Project Switcher

To switch from your currently in use project to another, you can click on the project name in the top left. This section also shows you the current connection status with the system. Hovering over the project switcher will show you the URL you're currently connected to and will show you the latency to the server.

#### Collection Navigation

The first of three sections of links shows the links to all the available collections.

::: tip
Your system administrator has the ability to [override the links](#) in the sidebar, so the way it looks and works might differ in your application.
:::

#### Extensions

The second section of links contains the different installed extensions. These pages provide extra functionality in the system.

::: tip
This menu won't show up if there aren't any extensions installed in the system.
:::

#### Bookmarks

The third and last section of links contains your bookmarks. To learn more about bookmarking pages, see [the bookmarking section](#bookmarking).

### User Menu

The user menu in the bottom left shows your currently in use user and it's avatar. Hovering over this section reveals the user menu. In this menu, you'll find different links based on your user group. 

### Info Sidebar

The info sidebar contains more information or settings for the current page. On collection pages for example, this sidebar allows you to configure the way your data is displayed. 

### Page

The main section of the page contains the actual page content.

## Pages

### Collections

### Items

#### Layouts (below we talk about Tabular only, with tips for others
#### Layout Options (changing fields, spacing, etc)
#### Reordering
#### Selecting (bulk edit, delete) & Opening
#### Bookmarking
#### Searching
#### Filtering
#### Sorting

### Item Detail

#### Required Fields
#### Saving
#### Activity & Revisions
#### Reverting
#### Comments & Mentions
#### Translations
#### Deleting

### File Library

#### Uploading & Adding Files

### User Directory

### My Account

### My Activity

## Permissions
## Status & Workflow
