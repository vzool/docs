# Feature Requests

## Our 80/20 Rule

The main thing to be aware of when submitting a new Directus feature request, is our rule on edge-cases. To keep the Directus core codebase as clean and simple as possible we will only consider adding features that at least 80% of our user-base will use. If we feel that less than 80% of our users will find the feature valuable then we will not implement it. Instead, those edge-case features should be added as Extensions.

## Which Repository?

Directus is decoupled, which means that the Application and API have separate codebases within two different GitHub repositories. If your new feature is specific to the App (the part you see and use in the browser) then you'll want to submit [here](https://github.com/directus/app/issues/new?template=Feature_request.md). Otherwise, if it is an API feature you can submit [here](https://github.com/directus/api/issues/new?template=Feature_request.md). If you're not sure or the feature is more conceptual or global, then submit it to the App and we'll organize it for you!

## Browsing Existing Requests

Before adding a new request, you should also first [search](https://github.com/directus/app/issues?q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc) to see if it has already been submitted. All feature requests should include the `enhancement` label, so you can filter by that. And remember to also check _closed_ issues since your feature might have already been submitted in the past and either [rejected](#Our-80/20-Rule) or already implemented.

Also, if you want to see the most highly requested features you can sort by `:+1:` (the thumbs-up emoji).

## Submitting a Request

If your idea passes the 80/20 test and has not already been submitted, then we'd love to hear it! Submit a new issue using the Feature Request template and be sure to include the `enhancement` label. It's important to completely fill our the template with as much useful information as possible so that we can properly review your request. If you have screenshots, designs, code samples, or any other helpful assets be sure to include those too!

## Voting on Requests

You can also vote on existing feature requests. As mentioned above, the `:+1:` and `:-1:` are used for sorting, so adding one of these reactions to the GitHub issue will cast a vote that helps us better identify the most desired (or undesired) features. And remember to add a comment if you have additional thoughts to help clarify or improve the request.

## Fullfilling a Request

Our core team is always working hard to implement the most highly-requested community features, but we're a small team. If you need the feature faster than we can provide it, or simply want to help improve the Directus platform, we'd love to receive a pull-request from you!