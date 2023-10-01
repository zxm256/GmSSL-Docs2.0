---
sidebar: auto
---
# ZUC256

## ZUC256算法

```c
# define ZUC256_KEY_SIZE	32
# define ZUC256_IV_SIZE		23
# define ZUC256_MAC32_SIZE	4
# define ZUC256_MAC64_SIZE	8
# define ZUC256_MAC128_SIZE	16
# define ZUC256_MIN_MAC_SIZE	ZUC256_MAC32_SIZE
# define ZUC256_MAX_MAC_SIZE	ZUC256_MAC128_SIZE
```

定义了ZUC256算法的密钥长度、初始向量长度、MAC长度等信息。

```c
typedef ZUC_STATE ZUC256_STATE;
```

ZUC2565算法中使用的`ZUC256_STATE`结构同`ZUC_STATE`结构。

```c
void zuc256_init(ZUC256_STATE *state, const uint8_t key[ZUC256_KEY_SIZE], const uint8_t iv[ZUC256_IV_SIZE]);
```

以256比特（以大小为32的字节数组表示）的初始密钥`key`和184比特（以大小为23的字节数组表示）的初始向量`iv`为输入，初始化`ZUC256_STATE`结构`state`。

```c
#define zuc256_generate_keystream(state,nwords,words) zuc_generate_keystream(state,nwords,words)
#define zuc256_generate_keyword(state) zuc_generate_keyword(state)
```

参见“ZUC算法”部分的`zuc_generate_keystream`和`zuc_generate_keyword`函数。

## ZUC256 MAC

```c
typedef struct ZUC256_MAC_CTX_st {
	ZUC_UINT31 LFSR[16];
	ZUC_UINT32 R1;
	ZUC_UINT32 R2;
	ZUC_UINT32 T[4];
	ZUC_UINT32 K0[4];
	uint8_t buf[4];
	int buflen;
	int macbits;
} ZUC256_MAC_CTX;
```

`ZUC256_MAC_CTX`结构包含16个31比特的线性反馈移位寄存器寄存器变量`LFSR`、非线性函数的2个32比特记忆单元变量`R1`和`R2`、32比特字变量数组`T`和`K0`、计数器字节数组`buf`、整数`buflen`和输出MAC长度`macbits`。

```c
void zuc256_mac_init(ZUC256_MAC_CTX *ctx, const uint8_t key[ZUC256_KEY_SIZE],
	const uint8_t iv[ZUC256_IV_SIZE], int macbits);
```

以256比特（以大小为32的字节数组表示）的初始密钥`key`和184比特（以大小为23的字节数组表示）的初始向量`iv`为输入，初始化`ZUC256_MAC_CTX`结构`ctx`，需要同时给定输出最终的MAC长度`macbits`。

```c
void zuc256_mac_update(ZUC256_MAC_CTX *ctx, const uint8_t *data, size_t len);
```

用长度为`len`的字节数组`data`更新`ZUC256_MAC_CTX`结构`ctx`。

```c
void zuc256_mac_finish(ZUC256_MAC_CTX *ctx, const uint8_t *data, size_t nbits, uint8_t *mac);
```

用长度为`nbits`的字节数组`data`更新`ZUC256_MAC_CTX`结构`ctx`，并输出使用ZUC完整性算法计算出的`macbits`比特消息认证码（该参数需要在调用`zuc256_mac_init`函数时先行提供），将其存放到数组`mac`中。
