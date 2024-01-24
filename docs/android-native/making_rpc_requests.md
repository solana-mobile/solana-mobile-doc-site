import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Making RPC requests

To interface with the Solana network, a client needs to construct and send [_JSON RPC requests_](https://docs.solana.com/api/http) to an [_RPC endpoint_](https://docs.solana.com/cluster/rpc-endpoints).

## Add dependencies

The [`rpc-core`](https://github.com/solana-mobile/rpc-core) library provides convenient classes and abstractions to build and submit requests according to the JSON-RPC 2.0 specification.

<Tabs>
<TabItem value="build.gradle.kts" label="build.gradle.kts">

```groovy
dependencies {
    implementation("com.solanamobile:rpc-core:0.2.4")
}
```

</TabItem>
</Tabs>

## Creating a JSON RPC Request

The `rpc-core` library defines a `JsonRpc20Request` constructor to conveniently construct a Solana JSON RPC request.

Populate the JSON object with the method name and JSON serialized parameters of a [Solana RPC method](https://docs.solana.com/api/http). The
constructor also includes a `requestId` parameter, as per JSON-RPC spec.

### Example: `getLatestBlockhash` RPC request

```kotlin
fun createBlockhashRequest(commitment: String = "confirmed", requestId: String = "1") =
    JsonRpc20Request(
        // JSON RPC Method (ie: `getLatestBlockhash`, `getSignatureForAddresses`)
        method = "getLatestBlockhash",
        // Populate with JSON parameters
        params = buildJsonArray {
            addJsonObject {
                put("commitment", commitment)
            }
        },
        requestId
    )
```

## Defining the JSON RPC Response

After creating the request, create [Kotlin serializable classes](https://kotlinlang.org/docs/serialization.html#libraries) that define the expected response payload for that request.

In the following example, we are defining the expected response of the `getLatestBlockhash` request using the `kotlinx.serialization` library.

### Example: `getLatestBlockhash` RPC response

```kotlin
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.*

@Serializable
class BlockhashResponse(val value: BlockhashInfo)

@Serializable
class BlockhashInfo(
    val blockhash: String,
    val lastValidBlockHeight: Long
)

// Additionally, define an exception in case of failure during request
class BlockhashException(message: String? = null, cause: Throwable? = null) : RuntimeException(message, cause)
```

## Implement `HttpNetworkDriver`

The `rpc-core` library defines a `HttpNetworkDriver` interface that is used to make network requests.

```kotlin
interface HttpRequest {
    val url: String
    val method: String
    val properties: Map<String, String>
    val body: String?
}

interface HttpNetworkDriver {
    suspend fun makeHttpRequest(request: HttpRequest): String
}
```

You can use a common networking package like the Ktor library to implement the `makeHttpRequest` method. The following
is an example from the [Kotlin Jetpack Compose Scaffold sample app](https://github.com/solana-mobile/solana-kotlin-compose-scaffold/blob/main/app/src/main/java/com/example/solanakotlincomposescaffold/networking/HttpDriver.kt).

```kotlin
import com.solana.networking.HttpNetworkDriver
import com.solana.networking.HttpRequest
import io.ktor.client.request.*
import io.ktor.client.HttpClient
import io.ktor.client.engine.android.Android
import io.ktor.client.statement.bodyAsText
import io.ktor.http.HttpMethod

class KtorHttpDriver : HttpNetworkDriver {
    override suspend fun makeHttpRequest(request: HttpRequest): String =
        HttpClient(Android).use { client ->
            client.request(request.url) {
                method = HttpMethod.parse(request.method)
                request.properties.forEach { (k, v) ->
                    header(k, v)
                }
                setBody(request.body)
            }.bodyAsText()
        }
}
```

## Sending RPC requests

After putting these parts together, use the `Rpc20Driver` class to point to an RPC uri, send
the request, and receive a response.

```kotlin
// import com.example.solanakotlincomposescaffold.networking.KtorHttpDriver
import com.solana.networking.Rpc20Driver
import com.solana.rpccore.JsonRpc20Request
import com.solana.transaction.Blockhash
import java.util.UUID

fun getLatestBlockhash(): Blockhash {
    // Create the Rpc20Driver and specify the RPC uri and network driver
    val rpc = Rpc20Driver("https://api.devnet.solana.com", KtorHttpDriver())

    // Construct the RPC request
    val requestId = UUID.randomUUID().toString()
    val request = createBlockhashRequest(commitment, requestId)

    // Send the request and provide the serializer for the expected response
    val response = rpc.makeRequest(request, BlockhashResponse.serializer())

    response.error?.let { error ->
        throw BlockhashException("Could not fetch latest blockhash: ${error.code}, ${error.message}")
    }

    // Unwrap the response to receive the base58 blockhash string
    val base58Blockhash = response.result?.value?.blockhash

    // Return a `Blockhash` object from the web3-solana library
    Blockhash.from(base58Blockhash
        ?: throw BlockhashException("Could not fetch latest blockhash: UnknownError"))
}
```

## Next steps

- Read the following _Building transactions_ guide to learn how to create transactions that interact with on-chain Solana Programs.
- Browse the [full list](https://docs.solana.com/api/http) of Solana RPC HTTP Methods
