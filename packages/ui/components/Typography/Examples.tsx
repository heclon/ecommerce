import React from 'react'
import * as Typography from './'
export const defaultTitle = 'Provider Choice'
export const defaultParagraph = 'We are a leading Ecommerce provider in the private sector.'
export interface ExamplesProps {
  heading1: string
  heading2: string
  paragraph: string
  small: string
  strong: string
  emphasis: string
  listItems: string[]
  numberListItems: string[]
}
const Examples = (args: ExamplesProps) => {
  return (
    <div className="container mx-auto px-4 ">
      <div className="mb-12 ">
        {/* h1 */}
        <div className="mb-4">
          <div className="mb-2 flex w-full flex-row justify-between rounded-lg p-4">
            <Typography.Heading1 {...args}>{args.heading1}</Typography.Heading1>
            <div className="text-right">
              <Typography.Strong>H1: Main heading (Inter 1.875rem bold)</Typography.Strong>
              <Typography.Code>Typography.Heading1</Typography.Code>
              <Typography.Paragraph>Use as main header on a page</Typography.Paragraph>
            </div>
          </div>
        </div>
        {/* h2  */}
        <div className="mb-4">
          <div className="mb-2 flex w-full flex-row justify-between rounded-lg p-4">
            <Typography.Heading2 {...args}>{args.heading2}</Typography.Heading2>
            <div className="text-right">
              <Typography.Strong>H2: Secondary heading (Inter 1.25rem semi-bold)</Typography.Strong>
              <Typography.Code>Typography.Heading2</Typography.Code>
              <Typography.Paragraph>Use as sub-heading on a page</Typography.Paragraph>
            </div>
          </div>
        </div>
      </div>

      <hr className="mb-8" />

      {/* Paragraphs  */}
      <div className="mb-12 ">
        <div className="mb-2 flex w-full flex-row justify-between rounded-lg p-4">
          <Typography.Paragraph {...args}>{args.paragraph}</Typography.Paragraph>
          <div className="text-right">
            <Typography.Strong>Paragraph text (Inter 1rem normal)</Typography.Strong>
            <Typography.Code>Typography.Paragraph</Typography.Code>
            <Typography.Paragraph>Use as standard type</Typography.Paragraph>
          </div>
        </div>
        <div className="mb-2 flex w-full flex-row justify-between rounded-lg p-4">
          <Typography.Strong {...args}>{args.strong}</Typography.Strong>
          <div className="text-right">
            <Typography.Strong>Strong text (Inter 1rem semi-bold)</Typography.Strong>
            <Typography.Code>Typography.Strong</Typography.Code>
            <Typography.Paragraph>Use to highlight important text</Typography.Paragraph>
          </div>
        </div>
        <div className="mb-2 flex w-full flex-row justify-between rounded-lg p-4">
          <Typography.Emphasis {...args}>{args.emphasis}</Typography.Emphasis>
          <div className="text-right">
            <Typography.Strong>Emphasis text (Inter 1rem italic)</Typography.Strong>
            <Typography.Code>Typography.Emphasis</Typography.Code>
            <Typography.Paragraph>Use to highlight important text</Typography.Paragraph>
          </div>
        </div>
        <div className="mb-2 flex w-full flex-row justify-between rounded-lg p-4">
          <Typography.Small {...args}>{args.small}</Typography.Small>
          <div className="text-right">
            <Typography.Strong>Small text (Inter 0.75rem normal)</Typography.Strong>
            <Typography.Code>Typography.Small</Typography.Code>
            <Typography.Paragraph>Use to highlight important text</Typography.Paragraph>
          </div>
        </div>
      </div>

      <hr className="mb-8" />

      {/* Lists */}
      <div className="mb-2 flex w-full flex-row justify-between rounded-lg p-4">
        <ul className="ml-12 mb-12">
          {args.listItems &&
            args.listItems.map((item: string, index: number) => (
              <Typography.ListItem key={index} {...args}>
                {item}
              </Typography.ListItem>
            ))}
        </ul>
        <div className="text-right">
          <Typography.Strong>List item (Inter 1rem normal)</Typography.Strong>
          <Typography.Code>Typography.ListItem</Typography.Code>
          <Typography.Paragraph>Use for list with circle points</Typography.Paragraph>
        </div>
      </div>
      <div className="mb-2 flex w-full flex-row justify-between rounded-lg p-4">
        <ol className="ml-12 mb-12">
          {args.numberListItems &&
            args.numberListItems.map((item: string, index: number) => (
              <Typography.NumberListItem key={index} {...args}>
                {item}
              </Typography.NumberListItem>
            ))}
        </ol>
        <div className="text-right">
          <Typography.Strong>Number list item (Inter 1rem normal)</Typography.Strong>
          <Typography.Code>Typography.NumberListItem</Typography.Code>
          <Typography.Paragraph>Use for numbered lists</Typography.Paragraph>
        </div>
      </div>
    </div>
  )
}

export default Examples
