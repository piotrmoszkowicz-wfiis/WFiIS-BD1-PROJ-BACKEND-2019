import {
  Body,
  Delete,
  Get,
  JsonController,
  OnUndefined,
  Param,
  Params,
  Post
} from "routing-controllers";

import ItemService from "@services/ItemService";
import Item from "@models/Item";
import OwnedItem from "@models/OwnedItem";

@JsonController()
export default class ItemController {
  constructor(private itemService = new ItemService()) {}

  @Post("/item")
  @OnUndefined(400)
  public addItem(@Body({ required: true }) newItemData: Partial<Item>) {
    return this.itemService.addItem(newItemData);
  }

  @Post("/item/give")
  @OnUndefined(400)
  public giveItem(
    @Body({ required: true }) newOwnedItemData: Partial<OwnedItem>
  ) {
    return this.itemService.giveItem(newOwnedItemData);
  }

  @Get("/item/:kitId?")
  public getItems(@Params({ required: false }) params: any) {
    if (!params) {
      return this.itemService.getAllItems(undefined);
    }
    return this.itemService.getAllItems(params.kitId);
  }

  @Get("/item/single/:itemId")
  @OnUndefined(400)
  public getItem(@Param("itemId") itemId: number) {
    return this.itemService
      .getItemWithOffers(itemId)
      .then(item => item.toJSON());
  }

  @Delete("/item/:itemId")
  @OnUndefined(400)
  public deleteItem(@Param("itemId") itemId: number) {
    return this.itemService.deleteItem(itemId);
  }

  @Delete("/item/revoke/:itemOwnedId")
  @OnUndefined(400)
  public revokeItem(@Param("itemOwnedId") itemOwnedId: number) {
    return this.itemService.revokeItem(itemOwnedId);
  }
}
