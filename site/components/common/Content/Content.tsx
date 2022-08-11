import { useState } from 'react'

interface ContentProps {
  componentStyle: any
  adjustmentObject: any
}

const Content: React.FC<ContentProps> = ({
  componentStyle,
  adjustmentObject,
}) => {
  const [selectedContent, setSelectedContent] = useState('')
  const contentName = 'Content'
  const cs = componentStyle[contentName]
  const ao = adjustmentObject[contentName]

  const contentLeftName = 'ContentLeft'
  const contentLeftAO = ao[contentLeftName]

  const contentRightName = 'ContentRight'
  const contentRightAO = ao[contentRightName]
  return (
    <div className="w-full flex justify-center items-center my-12">
      <div className="w-9/12 flex justify-between gap-16">
        <div
          className="text-lg w-1/2"
          dangerouslySetInnerHTML={{ __html: contentLeftAO.html }}
        ></div>
        <div className="text-lg w-1/2">
          <div className="flex items-center gap-10 mb-10">
            {contentRightAO.tabs.map(
              (tab: { title: string; content: string }) => (
                <p
                  key={tab.title}
                  onClick={() => setSelectedContent(tab.content)}
                  className={`font-bold cursor-pointer border-black ${
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
