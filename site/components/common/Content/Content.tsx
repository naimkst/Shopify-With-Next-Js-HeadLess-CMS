import { useState } from 'react'
import s from './Content.module.css'
import cn from 'clsx'

interface ContentProps {
  componentStyle: any
  adjustmentObject: any
}

const Content: React.FC<ContentProps> = ({
  componentStyle,
  adjustmentObject,
}) => {
  const contentName = 'Content'
  const cs = componentStyle[contentName]
  const ao = adjustmentObject[contentName]

  const contentLeftName = 'ContentLeft'
  const contentLeftAO = ao[contentLeftName]

  const contentRightName = 'ContentRight'
  const contentRightAO = ao[contentRightName]

  const [selectedContent, setSelectedContent] = useState(
    contentRightAO.tabs[0].content
  )

  return (
    <div className={cn(s.content)}>
      <div className="max-w-2xl mx-auto py-24 px-4 grid grid-cols-1 gap-y-16 gap-x-12 sm:px-6 sm:py-20 lg:max-w-7xl lg:px-8 lg:grid-cols-2 font-camptonSans">
        <div
          className="text-lg"
          dangerouslySetInnerHTML={{ __html: contentLeftAO.html }}
        ></div>
        <div className="text-lg">
          <div className="flex items-center gap-10 mb-10">
            {contentRightAO.tabs.map(
              (tab: { title: string; content: string }) => (
                <p
                  key={tab.title}
                  onClick={() => setSelectedContent(tab.content)}
                  className={`font-bold cursor-pointer border-black font-camptonBold ${
                    selectedContent === tab.content && 'border-b'
                  } `}
                >
                  {tab.title}
                </p>
              )
            )}
          </div>
          <div dangerouslySetInnerHTML={{ __html: selectedContent }}></div>
        </div>
      </div>
    </div>
  )
}
export default Content
