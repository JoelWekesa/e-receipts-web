
export type SelectedOptions = Record<string, string | null>
import { Inventory } from '@/models/inventory/inventory'
import { Dispatch, SetStateAction } from 'react'

export function getProductVariant(product: Inventory, opts: SelectedOptions) {
    const variant = product.Option.find((variant) => {
        return Object.entries(opts).every(([key, _value]) =>
            variant.options.find((option) => {
                return option.toLowerCase() === key.toLowerCase()
                // if (
                //     option.__typename === 'MultipleChoiceOption' &&
                //     option.displayName.toLowerCase() === key.toLowerCase()
                // ) {
                //     return option.values.find((v) => v.label.toLowerCase() === value)
                // }
            })
        )
    })
    return variant
}

export function selectDefaultOptionFromProduct(
    product: Inventory,
    updater: Dispatch<SetStateAction<SelectedOptions>>
) {
    // Selects the default option
    product.Option[0]?.options?.forEach((v) => {
        updater((choices) => ({
            ...choices,
            [v.toLowerCase()]: v.toLowerCase(),
        }))
    })
}