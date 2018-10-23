# Working with GitHub

_Loosely based on [this great Gist](https://gist.github.com/Chaser324/ce0505fbed06b947d962) by [Chaser324](https://gist.github.com/Chaser324)_

We like to keep a tight flow in working with GitHub, to make sure we have a clear history and accountability of what happened / changed when and where. Working with Git, and especially the GitHub specific features like forking and creating pull requests, can be quite daunting for new users. 

To help you out in your Git(Hub) adventures, we've put together the (fairly standard) flow of contributing to an open source repo.

## Forking the repo

Whether you're working on the api or the app, you will need to have your own copy of the codebase to work on. Head to the repo of the project you want to help out with and hit the Fork button. This will create a full copy of the whole project for you on your own account. 

To work on this copy, you can install the project locally according to the normal installation instructions, substituting the name `directus` with the name of your github account.

## Keeping your fork up to date

If you're doing more work than just a tiny fix, it's a good idea to keep your fork up to date with the "live" or _upstream_ repo. This is the main Directus repo that contains the latest code. If you don't keep your fork up to date with the upstream one, you'll run into conflicts pretty fast. These conflicts will arise when you made a change in a file that changed in the upstream repo in the meantime.

### On git remotes

When using git on the command line, you often pull and push to `origin`. You might have seen this term in certain commands, like

```bash
git push origin master
```

or

```bash
git pull origin new-feature
```

In this case, the word `origin` is refered to as a _remote_. It's basically nothing more than a name for the full git url you cloned the project from:

```bash
git push origin master
```

is equal to

```bash
git push git@github.com:username/repo.git master
```

A local git repo can have multiple remotes. While it's not very common to push your code to multiple repo's, it's very useful when working on open source projects. It allows you to add the upstream repo as another remote, making it possible to fetch the latest changes straight into your local project. 

```bash
# Add 'upstream' to remotes
git remote add upstream git@github.com:directus/app.git
```

When you want to update your fork with the latest changes from the upstream project, you first have to fetch all the (new) branches and commits by running

```bash
git fetch upstream
```

When all the changes are fetched, you can checkout the branch you want to update and merge in the changes.

```
git checkout master
git rebase upstream/master
```

If you haven't made any commits on the branch you're updating, git will update your branch without complaints. If you _have_ created commits in the meantime, git will step by step apply all the commits from _upstream_ and try to add in the commit you made in the meantime. It is very plausible that conflicts arise at this stage. When you've changed something that also changed on the upstream, git requires you to resolve the conflict yourself before being able to move on.

::: danger Conflicts
You should always favor changes on upstream over your local ones.
:::

## Doing Work

Whenever you begin working on a bugfix or new feature, make sure to create a new branch. This makes sure that your changes are organized and separated from the master branch, so you can submit and manage your pull requests for separate fixes/features more easily.

```bash
# Checkout the master branch - you want your new branch to come from master
git checkout master

# Create a new branch named newfeature (give your branch its own simple informative name)
git branch newfeature

# Switch to your new branch
git checkout newfeature
```

::: warning Up-to-date
Make sure to update your master branch with the one from upstream, so you're certain you start with the latest version of the project!
:::

## Submitting a Pull Request

Prior to opening your pull request, you might want to update your branch a final time, so it can immediately be merged into the master branch of upstream.

```bash
# Fetch upstream master and merge with your repo's master branch
git fetch upstream
git checkout master
git merge upstream/master

# If there were any new commits, rebase your development branch
git checkout newfeature
git rebase master
```

::: warning 
Make sure to check if your branch is up to date with the `master` branch of upstream. An outdated branch makes it near impossible for the maintainers of Directus to check and review the pull request and will most likely result in a delayed merge.
:::

Once you've commited and pushed all the changes on your branch to your fork on GitHub, head over to GitHub, select your branch and hit the pull request button. 

You can still push new commits to a pull request that already has been opened. This way, you can fix certain comments reviewers might have left behind.

::: tip
Please allow the maintainers of upstream to push commits to your fork by leaving the "Allow edits from maintainers" option turned on. This allows the maintainers of Directus to help out in your PR!
:::
