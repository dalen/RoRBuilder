# Authenticated build sharing proposal

RoRBuilder remains a client application. Named builds are currently stored in
the player's browser, and Gear, Renown, and Mastery tabs create standalone URL
shares. Persistent public builds are disabled in the upstream port because the
repository has no official account session or storage API.

An official authenticated API should expose a versioned `Build` containing an
opaque ID/slug, owner, name, description, career, serialized Gear/Renown/Mastery
payload, visibility (`PRIVATE`, `UNLISTED`, or `PUBLIC`), timestamps, and
deduplicated view/like counts. Required operations are My Builds, one accessible
build, filtered/ranked public builds, create/update/delete, publish/unpublish,
and one reversible like per authenticated account.

All ownership must come from the server session. Existing anonymous URL shares
and legacy `/career/...` and `/renown/...` links should remain supported. This
keeps the feature independent of contributor-owned hosting or storage.
