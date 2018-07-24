import React from 'react'
import { getAGZAlluser } from '../../Request/reptile'

export default class reptileComponent extends React.PureComponent {
  componentWillMount=async () => {
    const res = await getAGZAlluser({
      fieldName: './nodejs/Request/3344/reptile/File/index1.txt',
    })
    console.log(2, res)
  }
  render() {
    return (
      <div>1</div>
    )
  }
}
