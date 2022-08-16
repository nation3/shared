# Installation

`npm install @nation3/agreements`

# Hooks

## useWriteAgreement

`const { createAgreement, joinAgreement } = useWriteAgreement();`

**createAgreement**: creates a new agreement with the specified positions

- `terms`: the terms of the agreement (string)
- `metadataURI`: URI to the metadata to be referenced by the agreement (string)
- `positions`: the positions of the agreement (array [string, string] translating to [address, balance])

**joinAgreement**: joins an existing agreement based on the user's position defined during creation

- `agreementId`: the id of the agreement to join (string)
- `positions`: the positions of the agreement (array [string, string] translating to [address, balance])
- `balance`: the user's balance in the agreement (string)
