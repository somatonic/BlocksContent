# Blocks Content alpha

(c) 2013 by Soma

Module to help create content blocks for pages. The blocks are defined by normal templates you create in ProcessWire and their template file is used to render the output. 

This is a first alpha version for testing and getting it out to people for looking at it and getting feedback.

## Requirements 

- To develop this module I used dev version of PW. Not sure there's anything dependent and I haven't tested in 2.3 stable, but should be fine.

- The module currently uses Fredi to build the edit modal on front-end.
http://modules.processwire.com/modules/fredi/


## Setup

1. Install Module *Blocks Content*: will also install *Process Blocks Content*
2. The module also creates a new template *pwbc_blocks_parent*, that is used to create the remote parent page in the admin for storing the blocks as children. Use the family children setting to limit creating blocks using your block templates you going to create.
3. The module also creates a new page field *pwbc_blocks_select*. This is used to manage and create the blocks in the admin. Add this field to templates you want to create blocks for. It has a special custom php code. Leave as is, but you can change the label for example.
4. Create some block templates. Do this with a prefix *block_*. It will automaticly recognize them and set the template file (php) to be in /site/templates/blocks/.. Create the template file in there using the same name. i.e. if you create a *block_image-text* you create the partial template file /site/templates/blocks/block_image-text.php
5. As mentioned earlier: Use the family children setting of the *pwbc_blocks_parent* template to limit creating blocks using your block templates.

## Template code

For now you can use this code to output the blocks in the template file:

Somewhere at the beginning of you templates (head.inc or _init.php) you would load the BlocksContent and Fredi module and output the scripts like:

```
$blocks = $modules->get("BlocksContent");   
if($user->isLoggedin()) {
    $fredi = $modules->get("Fredi");
}
```

Now in the head of your html output you render the scripts required:

```
if($user->isLoggedin()) {
    echo $fredi->renderScript();
    echo $blocks->renderScript();
}
```

Then use this code in your template where you want the blocks of the page to output:

```
echo $blocks->render();
```

That's it for now.

Here is an example block template code I used:

```
<div class="block cf">
    <h2><?php echo $page->title?></h2>
    <?php if($page->image): ?>
    <img class="<?php echo $page->image_align;?>" src="<?php echo $page->image->size(250,0)->url?>"/>
    <?php endif; ?>
    <p><?php echo $page->body; ?></p>
</div>
```

Now when you create or edit a page, you'll have an empty "Create Blocks" field with a "+ Add new block" link. Create new blocks and publish them, after closing the modal, the newly created block will appear in the ASM select. Save the page and view it on the front-end. Have fun.

When removing a block from the ASM select and saving the page the block will get deleted. Sorting the blocks in front-end will sort them in the ASM select. Deleting is currently not possible from the front-end. Also there seems to be and issue with deleting blocks in the backend when using the modal "Move to trash" button you see at the bottom.


