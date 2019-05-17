# T7api

Simple Tekken 7 movelist querying API

## Endpoints

- `/cmd`: Fuzzy search for a specific character command
- `/filter`: Filter a character's move list

## Parameters

#### Required
- `c`: Name of the character (e.g. `c=paul`)

#### `/cmd`

- `cmd`: Command to find in the character's move list (e.g. `cmd=df2`)

#### `/filter`

- `plusOnBlock` -> `Bool`
- `plusOnHit` -> `Bool`
- `plusOnCounter` -> `Bool`
- `minusOnBlock` -> `Bool`
- `minusOnHit` -> `Bool`
- `minusOnCounter` -> `Bool`
- `hit` -> `enum { 'h', 'm', 'l' }` (also accept comma separated list of values)
- `speed` -> `range -> min,max`
- `crush` -> `enum { 'TC', 'TJ' }` (elso accept separated list of values)
- `special` -> `String` (matches to the `notes` property on the `move` object)

### Examples

```
/cmd?c=josie&cmd=df2
```
Fuzzy search Josie's movelist for "df2"

```
/filter?c=paul&minusOnHit=true
```
Find all of Paul's punishable moves on hit

## TODO

Add all remaining characters to mongoDB
Add CI
