# Docs Structure

The documentation of Directus is divided into a few different sections.

## Development Environment

You can always easily contribute directly on GitHub for typos and small changes, but if you would like to make larger updates you can install the Docs locally. The steps for this are as follows:

1. `git clone https://github.com/directus/docs-v7.git` (clone the repo locally)
1. `cd` (move to the root directory)
1. `npm install` (install the dependencies)
1. `npm run dev` (run the development script)

## Introduction

This houses the global (root level) docs. Here we store important resources that are shared equally between the App and API, or are about the platform in general.

## API

We organize all pages related to the API inside this directory.

### API Reference

This is one (long) single page to make it easier to use your browser's search feature to find specific things. It contains information on every endpoint, parameter, error code, and auth method available in the API.

### API Admin Guide

For more information on installing, configuring, and updating the API.

### API Contributor Guide

Information on customizing, extending, or better understanding the inner-workings of the API.

## App

We organize all pages related to the App inside this directory.

### User Guide

This is one single page to make it easier to read from end-to-end. The purpose is to give non-technical users a better understanding of how to use Directus. It does not include any Settings as those should be located in the App Admin guide.

### App Admin Guide

For more information on installing, configuring, and updating the App. This also includes information on everything inside the _Settings_ section of the App.

### App Contributor Guide

Information on customizing, extending, or better understanding the inner-workings of the App.

## Extensions

Because extensions are for the App but stored within the API, we've given them their own section to avoid confusion. Anything to do with extending Directus should be located here.