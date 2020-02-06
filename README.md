# T7api

Simple Tekken 7 movelist querying API

## Tech Stack

- Node.js (ES6+)
- Docker
- Postgres
- Redis
- Nginx
- Heroku
- ESLint *(Airbnb styleguide)*

## Setup

After cloning the repo and assuming you have a working docker install on your machine, run:
```bash
$ docker-compose up
```

## Endpoints

Base URL: `https://t7api.herokuapp.com` **now outdated**

- `/characters/`
- `/characters/<character-name>`
- `/characters/<character-name>/commons`

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
- `onBlock` -> `range -> min,max`
- `onHit` -> `range -> min,max`
- `onCounter` -> `range -> min,max`
- `hit` -> `enum { 'h', 'm', 'l' }` (also accept comma separated list of values)
- `firstHit` -> `enum { 'h', 'm', 'l' }`
- `lastHit` -> `enum { 'h', 'm', 'l' }`
- `speed` -> `range -> min,max`
- `crush` -> `enum { 'TC', 'TJ' }` (also accept comma separated list of values)
- `special` -> `String` (matches to the `notes` property on the `move` object)

#### `sort`

- `sort` -> `enum { 'block', 'hit', 'counter' }` (also accept comma separated list of values)

### Examples

```
/characters
```
Return a list of all available characters

```
/characters/josie?cmd=df2
```
Fuzzy search Josie's movelist for "df2"

```
/characters/paul?minusOnHit=true
```
Find all of Paul's punishable or 'loss of turn' on hit moves

```
/characters/kazuya?lastHit=m&onHit=10,-4
```
Find all of Kazuya's moves that end with a mid and are between +10 and -4 on block

```
/characters/kazumi?speed=9,13&onBlock=10,-3&sort=block,hit
```
Sort Kazumi's quickest potentially abusable pokes by onBlock and onHit frames (onBlock frames have precedence)

