# Description

**UI Sink** as a subset of the **UI** instances that are meant to have **logic** go through them, but the components themselves do **NOT** interface with said logic

# Examples

The easiest example would be a wrapper around some 3rd party library that exposes **logic** to the outside (`react-grid-layout` in case of this app). Whilst the use of that logic may differ from case to case, the representation of that logic (ui) is likely to be consistent across the app.

Another use case would be to act as a **dispatch** to another app module or a set of app modules (`widgets` in case of this app). In case one needs to repeat the consistent ui but change logic from case to case, **UI Sinks** handle the ui part and **forward** the logic to its descendants.

# Add-on

**UI Sink** does not necessarily bend or break the initial idea of the app structure but it does stretch the idea of what should be considered a logic-free component. While using such approach is completely fine, one should always think twice about the structure that surrounds a **UI sink** and whether the sink can be interpreted as a plain data+ui module
