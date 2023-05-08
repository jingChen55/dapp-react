/**
 *
 * @param data
 * @returns
 */
export async function AddrCurrentScores(address: any) {
  const data = {
    operationName: "AddrCurrentScores",
    variables: { addr: address },
    query: 
    `query AddrCurrentScores($addr: String!) {
      AddrCurrentScores(addr: $addr) {
        scores { scoreId scoreNam scoreType score __typename }
        isNewUser
        isFrozen
        isCanUnFreeze
        __typename
      }
    }
    `,
  };

  return await fetch("https://graphigo.prd.space.id/query", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
