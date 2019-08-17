# pixel-dials-js

This library add to your html page pixel style dials and clock.

Now you can use two new tags:

* `<pixDial>`
* `<pixClock>`

## `<pixDial>`

This tag make different dials on your page.  
It has some main attributes which can be used in all types of dial:

* `type`
* `numbers`
* `align`
* `color`

And some others attributes:

* `value`
* `from`
* `to`
* `interval`

### attribute `numbers`

There you need to set how many levels of numbers will be in dial.

Warning: The value must be positive, maximum limited only by width of dial Wich you set in styles of tag. If count of numbers doesn't fit in dial with minimum size (4x5 pixels) value of this attribute will be corrected automatically.

### attribute `align`

There you can choose where in dial numbers will be positioned (`left`, `right` or `center`). Default value is `left`.

### attribute `color`

There you can choose color of numbers in dial. This value must be set in hex form. Default is `#000`.

### attribute `type`

That is main attribute of this tag.  
You can choose types from next list:

* `number`  
    With this type dial will show static number which will be taken from  attribute `value` which you can set.
* `range`  
    This type of dial show numbers from value of attribute `from` to value of attribute `to`. Value which this tag show will be updating in time which you set in attribute `interval` in ms (default: 1000ms). WARNING if value of attribute value less then 1000ms not all numbers will be drawn because redraw value of tag takes 1000ms.
* `auto-update`  
    This type work like type `number` but this type can check updating of attribute `value` through a certain time which you set in attribute `interval`.

## `<pixClock>`

This tag let you make pixel clocks on your page.  
It has some attributes:

* `type`;
* `align`;
* `color`;
* `interval`;

Attributes `aligh` and `color` have same functional as in tag `<pixDial>`.

### attribute `format`

There you set in which order and which sections will be shown.  
For example: `sm`. It means that the first two numbers will show sexonds and the next two  numbers will show minutes. Maximum length of this attribute is 3 symbols. Default set is: `hms`.  
Symbols shouldn't be repeated.  
Permissible characters is : s, m and h.

### attribute `interval`

It sets how often clock will be updated in ms.
