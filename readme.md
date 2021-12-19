# Descent Second Edition (D2E)

An easy-to-use collection of data and images from [Descent 2nd Edition](https://www.fantasyflightgames.com/en/products/descent-journeys-in-the-dark-second-edition/) by [Fantasy Flight Games](http://fantasyflightgames.com/).

## What's included

This repository contains data and images for the following components:

- advanced-quests
- agendas*
- agents
- allies
- ally-skills
- city-event-decks
- class-familiars
- class-items
- class-skills
- conditions
- corrupt-citizens
- explorations
- familiars
- heroes
- hybrid-class-skills
- lieutenants
- map-pieces
- monster-activations**
- monsters
- overlord-decks
- perils**
- plot-decks
- references
- relics
- round-summary*
- rumors
- search-deck
- secret-rooms
- shop-items
- statuses*
- tainted
- traps*
- travel-event-decks
- turn-summary

**The items listed above with a post-pended single asterisk are from User Community content. The items listed above with a post-pended double asterisk are from FFG & User Community content.**

There are three top-level directories: `data` , `images` , and `xwc`.

### data

The `data` folder contains all D2e Card Viewer data in JSON format.

### images

The `images` folder contains D2e Card Viewer images for each of the above data components.

### xwc

The `xwc` folder contains all of the files that power the D2e Card Viewer Chrome Extension/Firefox Add-On.

## Usage

You can use this data to build your own apps, etc.

The easiest way to do this is via [Git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules#Starting-with-Submodules):

* Git submodule: `git submodule add https://github.com/any2cards/d2e.git`

## Bugs / Issues

Please [open a ticket](https://github.com/any2cards/d2e/issues/new) on Github.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :tada:

When adding images please use [TinyPNG](https://tinypng.com/) to reduce their filesize as much as possible without affecting image quality.

## Projects

A list of projects that use this content:

- [D2e Card Viewer](https://chrome.google.com/webstore/search/d2e%20card%20viewer)

Want your project listed here? [Let us know!](https://github.com/any2cards/d2e/issues/new?title=Add%20Project)

## Versioning

This project uses [SemVer](http://semver.org/). Given a `MAJOR.MINOR.PATCH` version number, we will increment the:
- `MAJOR` version when existing content is changed in such a way that it can break consumers of the data
- `MINOR` version when new content is added in a backwards-compatible manner, or existing content is changed in a backwards-compatible manner
- `PATCH` version when fixing mistakes in existing content

## History

See the [Releases tab](https://github.com/any2cards/d2e/releases) in Github.

## Contributors

- William Habush (any2cards@yahoo.com)
- Guido Hansen (sadgit@penultimate.de)

This work would not have been possible without the invaluable help and guidance of Guido Kessels. You can find his excellent X-Wing data at: https://github.com/guidokessels/xwing-data.

---

D2e: Descent 2nd Edition and all related properties, images and text are owned by Fantasy Flight Games (FFG).

