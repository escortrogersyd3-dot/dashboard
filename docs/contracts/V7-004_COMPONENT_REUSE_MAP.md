# V7-004 Component Reuse Map

**Status: PLANNING / RECONSTRUCTION CONTRACT. This map does not authorize API, data, or deployment work.**

| V7 element | Classification | Authority / evidence | V7-004 scope |
|---|---|---|---|
| Desktop sidebar navigation | WRAP | [shadcn/ui sidebar registry](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry.json) identifies Sidebar as a reusable UI item with declared dependencies. | Static semantic navigation and V7 exterior only; no routing or persistence engine. |
| Mobile bottom navigation | WRAP | Same sidebar/navigation family; browser-native buttons retain accessible interaction semantics. | Static mobile representation only; no business navigation state. |
| Masthead / access tag | WRAP | V7 frozen DOM inventory: `mast`, `accessTag`; semantic header is browser-native. | Displays only “not connected”; no identity or permission decision. |
| Loading / Empty / Stale / Error / Permission panel | CUSTOM | GitHub review found reusable visual sidebar/alert primitives, but no component supplies the required Observer OS freshness + permission semantics. | A fixed label-to-copy mapper only; no API parsing, retry logic, access decision, or state inference. |

## Custom evidence and test boundary

`PresentationState` is custom only because the contract requires five separately visible states whose meaning originates in Observer OS. Its implementation is limited to presentation. It is checked by TypeScript and production build; later adapter OTPs must add contract and negative tests before it receives live inputs.
