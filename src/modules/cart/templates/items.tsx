import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Heading, Table } from "@medusajs/ui"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items
  return (
    <div>
      <div className="pb-3 flex items-center dark:text-white">
        <Heading className="text-[2rem] leading-[2.75rem]">Cart</Heading>
      </div>
      <Table className="dark:text-gray-300 dark:bg-gray-700 cart-item-table">
        <Table.Header className="border-t-0">
          <Table.Row className="text-ui-fg-subtle txt-medium-plus dark:bg-gray-900">
            <Table.HeaderCell className="!pl-0 text-center">Item</Table.HeaderCell>
            <Table.HeaderCell className="!p-1 md:!p-4"></Table.HeaderCell>
            <Table.HeaderCell className="!px-1 md:!px-4">Quantity</Table.HeaderCell>
            <Table.HeaderCell className="hidden small:table-cell !px-1 md:!px-4">
              Price
            </Table.HeaderCell>
            <Table.HeaderCell className="!pr-0 text-center">
              Total
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items
            ? items
                .sort((a, b) => {
                  return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                })
                .map((item) => {
                  return (
                    <Item
                      key={item.id}
                      item={item}
                      currencyCode={cart?.currency_code}
                    />
                  )
                })
            : repeat(5).map((i) => {
                return <SkeletonLineItem key={i} />
              })}
        </Table.Body>
      </Table>
    </div>
  )
}

export default ItemsTemplate
