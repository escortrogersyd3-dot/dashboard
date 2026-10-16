# V7-072 local interaction shell

## Authority and boundary

`OTP-V7-072-LOCAL-INTERACTION-SHELL-R1` adds only transient presentation navigation, an HTML native-dialog navigation drawer, an HTML native-dialog boundary note, and two presentation-only tabs. Browser-native `<dialog>` is reused for modal focus containment and Escape handling; Dashboard only wraps its frozen V7 appearance and copy.

No interaction reads or writes ObserverOS, performs fetches, stores state, starts patrols, calculates business results, decides permissions, or creates an authoritative status. Every state is React component memory and resets on a full page refresh.

## Required interaction evidence

- Pointer and keyboard can open and close both dialog surfaces.
- Native Escape closes the active dialog and returns focus to its opener.
- Drawer navigation selects a frozen section and moves to its fixed page anchor.
- Tabs change only the presentation-safe explanatory copy.
- Source assertions reject persistence, network primitives, and non-local navigation.

## Result boundary

`PASS_LOCAL_INTERACTION_SHELL` proves only an offline interaction shell. `HOLD_LIVE_INTEGRATION` remains until ObserverOS supplies an audited browser-safe read contract, permissions semantics, freshness/provenance and data authorization.
