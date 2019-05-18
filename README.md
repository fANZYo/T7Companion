# T7api

Simple Tekken 7 movelist querying API

## Tech Stack

- Node.js (ES6+)
- MongoDB
- Redis
- Heroku
- ESLint *(Airbnb styleguide)*
- CircleCI *(coming)*

## Endpoints

Base URL: `https://t7api.herokuapp.com`

- `/character/<character-name>`

## Parameters

#### `cmd`

- `cmd`: Command to find in the character's move list (e.g. `cmd=df2`)

#### `<filter>`

- `plusOnBlock` -> `Bool`
- `plusOnHit` -> `Bool`
- `plusOnCounter` -> `Bool`
- `minusOnBlock` -> `Bool`
- `minusOnHit` -> `Bool`
- `minusOnCounter` -> `Bool`
- `hit` -> `enum { 'h', 'm', 'l' }` (also accept comma separated list of values)
- `speed` -> `range -> min,max`
- `crush` -> `enum { 'TC', 'TJ' }` (elso accept comma separated list of values)
- `special` -> `String` (matches to the `notes` property on the `move` object)

### Examples

```
/character/josie?cmd=df2
```
Fuzzy search Josie's movelist for "df2"

```
/character/paul?minusOnHit=true
```
Find all of Paul's punishable on hit moves

## TODO

- Add CI
- Highlight safe moves
- Move names
- A gif of the move
- A quiz mode, where you see a gif of the move and you have to input the correct frame (dis)advantage
