# Principles & Focus Management

WCAG - Web Content Accessibility Guidelines  
WCAG Principles: POUR - Perceivable | Operable | Understandable | Robust  

**Perceivable** - Information and user interface components must be presentable to users in ways they can perceive.  
**Operable** - User interface components and navigation must be operable.  
**Understandable** - can users understand content and the interface? is interface consistent enough to avoid confusion?  
**Robust** - Content can be interpreted by by a wide variety of user agents, including assistive technologies.  

(!) Always keep in actual user experience.

**Focus**  
*"focusable"* vs. *"tabbable"*  
Focusable elements are elements that imply user interaction. These are either default (links, buttons, form elements etc.) or defined - by using tabindex.  
Tabbable elements are elements that receive focus through tab navigation.  
However, there is a slight difference between the terms, exemplified through the use of "tabindex"  
"tabindex" ensures focusability, but not tabbability - tabindex="-1" defines an element as focusable, but does not register the element in the so-called "tab order".
The element can receive focus programmatically.  
  
(!) Safari - for correct tab navigation, need to check a setting in Preferences  
  
**Focus Management**  
**Skip Links** -hidden links that bypass focusable areas ("skip to main content")  

**"sequential focus navigation starting point"** - browser behavior, defines where to start to search for focusable elements through tab navigation when there is no focused area (implications for "skip links");  
This behavior was defined differently on older browsers - for example, if focused element is hidden or deleted, focus would skip back to the beginning of the page, creating focus traps.  
Another example is using in-page references - called **named anchors** (href="#section_id"). Skip links are implemented this way.
Clicking (activating, for keyboard navigation) moves scroll but not focus to the referenced section. In this case, the next focused item would be the next in the tab order, not one in the referenced section. The solution would be to set tabindex=-1 on the referenced section.  
Offscreen focus - inspect using document.activeElement  
Keyboard trap - restrict tab navigation to a specific section. Can become disastrous if implemented incorrectly. Pattern used for modals.  

**Techniques**    
Roving focus ("wandering" focus)  
