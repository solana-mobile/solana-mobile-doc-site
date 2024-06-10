import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# RPC Client Usage guide

To interface with the Solana network, a client needs to construct and send [_JSON RPC requests_](https://docs.solana.com/api/http) to an [_RPC endpoint_](https://docs.solana.com/cluster/rpc-endpoints).

This guide will teach you how to use the `SolanaRpcClient` and send these RPC requests.

## Add dependencies

The [`rpc-core`](https://github.com/solana-mobile/rpc-core) library provides a convenient `SolanaRpcClient` that implements an API to call these RPC methods and return responses.

<Tabs>
<TabItem value="build.gradle.kts" label="build.gradle.kts">

```groovy
dependencies {
    implementation("com.solanamobile:rpc-core:0.2.6")
}
```

</TabItem>
</Tabs>

## Create an RPC Client

To create an instance of a `SolanaRpcClient`, pass in:

- an RPC `url` that the client will send requests.
- a `networkDriver` used to send HTTP requests.

In this example, we construct an RPC client pointed at devnet and Ktor as a network driver:

```kotlin
import com.solana.rpc.SolanaRpcClient
import com.solana.networking.KtorNetworkDriver

val rpcClient = SolanaRpcClient("https://api.devnet.solana.com", KtorNetworkDriver())
```

## Example: Fetching latest blockhash

Calling the `getLatestBlockhash` method returns an [`RpcResponse`](https://github.com/solana-mobile/rpc-core/blob/a6ea1466fb1d79113ca77f2d073d33a85fb5ad5e/rpccore/src/commonMain/kotlin/com/solana/rpccore/RpcResponse.kt#L6).

- If successful, the response result will contain a [`BlockhashResult`](https://github.com/solana-mobile/rpc-core/blob/a6ea1466fb1d79113ca77f2d073d33a85fb5ad5e/solanaclient/src/commonMain/kotlin/com/solana/rpc/SolanaRpcClient.kt#L232).

- If an error occured, the response will contain an [`RpcError`](https://github.com/solana-mobile/rpc-core/blob/a6ea1466fb1d79113ca77f2d073d33a85fb5ad5e/rpccore/src/commonMain/kotlin/com/solana/rpccore/RpcResponse.kt#L16).

```kotlin
import com.solana.rpc.SolanaRpcClient
import com.solana.networking.KtorNetworkDriver

val rpcClient = SolanaRpcClient("https://api.devnet.solana.com", KtorNetworkDriver())

val response = rpcClient.getLatestBlockhash()

if (response.result) {
    println("Latest blockhash: ${response.result.blockhash}")
} else if (response.error) {
    println("Failed to fetch latest blockhash: ${response.error.message}")
}
```

## Example: Sending a transaction

To submit a transaction to the RPC, use the `sendTransaction` method.

- If successful, the response result will contain a transaction signature string.

- If an error occured, the response will contain an [`RpcError`](https://github.com/solana-mobile/rpc-core/blob/a6ea1466fb1d79113ca77f2d073d33a85fb5ad5e/rpccore/src/commonMain/kotlin/com/solana/rpccore/RpcResponse.kt#L16).

```kotlin
import com.solana.rpc.SolanaRpcClient
import com.solana.networking.KtorNetworkDriver

val rpcClient = SolanaRpcClient("https://api.devnet.solana.com", KtorNetworkDriver())

val transaction = Transaction(/* ... */)
val response = rpc.sendTransaction(transaction)

if (response.result) {
    println("Transaction signature: ${response.result}")
} else if (response.error) {
    println("Failed to fetch latest blockhash: ${response.error.message}")
}

```

## Next steps

These examples are just some of the methods supported by `SolanaRpcClient`. Here are suggestions to continue learning:

- Read the following guide to learn how to build Solana program instructions and transactions.
- For a complete reference of the RPC methods supported, view the `SolanaRpcClient` [source code](https://github.com/solana-mobile/rpc-core/blob/main/solanaclient/src/commonMain/kotlin/com/solana/rpc/SolanaRpcClient.kt) and [unit tests](https://github.com/solana-mobile/rpc-core/blob/main/solanaclient/src/commonTest/kotlin/com/solana/rpc/RpcClientTests.kt).
- Read the [_Building JSON RPC requests_ deep dive](/android-native/building-json-rpc-requests) to learn how to create requests for RPC methods that aren't immediately supported by `SolanaRpcClient`.
