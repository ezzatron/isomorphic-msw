# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog], and this project adheres to [Semantic
Versioning].

[keep a changelog]: https://keepachangelog.com/en/1.0.0/
[semantic versioning]: https://semver.org/spec/v2.0.0.html

## Unreleased

### Added

- Support for [MSW v3].

[msw v3]: https://mswjs.io/blog/introducing-msw-3.0

### Changed

- **\[BREAKING]** `stop()` is now async, matching MSW v3's [`worker.stop()`
  change].

[`worker.stop()` change]:
  https://mswjs.io/docs/migrations/2.x-to-3.x#worker-stop

## [v1.0.1] - 2024-09-18

[v1.0.1]: https://github.com/ezzatron/isomorphic-msw/releases/tag/v1.0.1

### Fixed

- Fixed NPM publishing workflow permissions.

## [v1.0.0] - 2024-09-18

[v1.0.0]: https://github.com/ezzatron/isomorphic-msw/releases/tag/v1.0.0

### Added

- Releasing as stable.

## [v0.1.0] - 2024-09-18

[v0.1.0]: https://github.com/ezzatron/isomorphic-msw/releases/tag/v0.1.0

### Added

- Initial release.
