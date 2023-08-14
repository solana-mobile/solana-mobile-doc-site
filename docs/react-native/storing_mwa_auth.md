# Caching MWA Authorization

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A key component to unlocking great UX in mobile dApps is correctly storing the address and authentication token of a user's currently authorized wallet.

If authorization details are cached, then it can be re-used between reloads of the dApp (i.e: Staying "connected" after exiting and reopening the app).


## Simple Storage API

This guide will cover a simple storage API to manage authorization details in a dApp using the `@react-native-async-storage/async-storage` library.

### AsyncStorage 

Install it with:
<Tabs>
<TabItem value="yarn" label="yarn">

```shell
yarn add @react-native-async-storage/async-storage
```

</TabItem>
<TabItem value="npm" label="npm">

```shell
npm install @react-native-async-storage/async-storage
```

</TabItem>
</Tabs>


You can use it like this: 

```tsx
import AsyncStorage from '@react-native-async-storage/async-storage';

// Store a string against some key.
await AsyncStorage.setItem('address', 'abc123');
// Then, some time later...
const storedAddress = await AsyncStorage.getItem('address');
```

## Implementation Examples

### Check for cached authorization

When the dApp boots up, we first check the cache to see if there is a prior authorization. We designate
the cache keys to be `authToken` and `base64Address`.

```tsx
const App = () => {
    // Store details about the currently connected wallet.
    const [currentAccount, setCurrentAccount] = useState<{
        authToken: string;
        pubkey: PublicKey;
    } | null>(null);
    
    // When the application boots up, check to see if we have a prior authorization.
    useEffect(() => {
        (async () => {
            const [cachedAuthToken, cachedBase64Address] = await Promise.all([
                AsyncStorage.getItem('authToken'),
                AsyncStorage.getItem('base64Address'),
            ]);
            if (cachedBase64Address && cachedAuthToken) {
                const pubkeyAsByteArray = toByteArray(cachedBase64Address);
                const cachedCurrentAccount = {
                    authToken: cachedAuthToken,
                    pubkey: new PublicKey(pubkeyAsByteArray),
                };
                setCurrentAccount(cachedCurrentAccount);
            }
        })();
    }, []);

    /* ...*/
}
```

### Cache on authorize

You can cache the authorization details, when the user completes an `authorize` request with wallet. In this example,
the caches when the connect button is pressed.

```tsx
// Store details about the currently connected wallet.
const [currentAccount, setCurrentAccount] = useState<{
    authToken: string;
    pubkey: PublicKey;
} | null>(null);

const handleConnectPress = useCallback(() => {
    transact(async wallet => {
        const {accounts, auth_token} = await wallet.authorize({
            cluster: 'devnet',
            identity: {
                name: 'My amazing app',
            },
        });
        const firstAccount = accounts[0];
        AsyncStorage.setItem('authToken', auth_token);
        AsyncStorage.setItem('base64Address', firstAccount.address);
        const pubkeyAsByteArray = toByteArray(firstAccount.address);
        const nextCurrentAccount = {
            authToken: auth_token,
            pubkey: new PublicKey(pubkeyAsByteArray),
        };
        setCurrentAccount(nextCurrentAccount);
    });
}, []);
```

We can choose to only render the Connect button, if there is no `currentAccount` state.

### Clear cache on deauthorize
The user can choose to "disconnect" their wallet with the `deauthorize` MWA request. In this case,
we should invalidate the cache by calling `AsyncStorage.clear()`.

```tsx
// Pressing disconnect deauthorizes this app with the wallet, and clears
// all cached account information.
const handleDisconnectPress = useCallback(() => {
    transact(async wallet => {
        if (currentAccount == null) {
            throw new Error('There is no current account to deauthorize');
        }
        await wallet.deauthorize({auth_token: currentAccount.authToken});
        AsyncStorage.clear();
        setCurrentAccount(null);
    });
}, [currentAccount]);
```

## Reference Apps

The following reference apps showcase implementing MWA authorization in a dApp.

### [SimpleStorageDapp](https://github.com/solana-mobile/tutorial-apps/tree/main/SimpleStorageDapp)

This reference app makes a small change to the Solana Mobile dApp Scaffold adding an authorization cache with `AsyncStorage`. The current authorization
is managed through the [AuthorizationProvider](https://github.com/solana-mobile/tutorial-apps/blob/main/SimpleStorageDapp/components/providers/AuthorizationProvider.tsx) component.

### [example-react-native-app](https://github.com/solana-mobile/mobile-wallet-adapter/blob/main/examples/example-react-native-app/App.tsx#L31)

This reference app implements an `AsyncStorage` provider with the [`swr`](https://swr.vercel.app/) data fetching library. The caching and parsing logic
is defined in [`App`](https://github.com/solana-mobile/mobile-wallet-adapter/blob/main/examples/example-react-native-app/App.tsx#L78) component while
the current authorization is provided with the [`useAuthorization`](https://github.com/solana-mobile/mobile-wallet-adapter/blob/main/examples/example-react-native-app/utils/useAuthorization.tsx) hook.




