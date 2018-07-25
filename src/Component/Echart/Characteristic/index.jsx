import React from 'react'
import option from './option'

require('./style.less')

export default class Characteristic extends React.PureComponent {
  state={
    component: null,
    num: 0,
    echartHide: 'echartHide',
    echartShow: 'echartHide',
  }
  componentDidMount=() => {
    // option('echart')
  }

  TextA= (
    <div>
      <p>ECharts，一个纯 Javascript 的图表库，可以流畅的运行在 PC 和移动设备上，兼容当前绝大部分浏览器（IE8/9/10/11，Chrome，Firefox，Safari等），底层依赖轻量级的 Canvas 类库 ZRender，提供直观，生动，可交互，可高度个性化定制的数据可视化图表。</p>
      <p>ECharts 3 中更是加入了更多丰富的交互功能以及更多的可视化效果，并且对移动端做了深度的优化。</p>
    </div>
  )
  TextB=(
    <div>
    <h6>丰富的图表类型</h6>
    <p>ECharts 提供了常规的折线图，柱状图，散点图，饼图，K线图，用于统计的盒形图，用于地理数据可视化的地图，热力图，线图，用于关系数据可视化的关系图，treemap，多维数据可视化的平行坐标，还有用于 BI 的漏斗图，仪表盘，并且支持图与图之间的混搭。
    </p>
    <p>你可以在下载界面下载包含所有图表的构建文件，如果只是需要其中一两个图表，又嫌包含所有图表的构建文件太大，也可以在在线构建中选择需要的图表类型后自定义构建。</p>
    </div>
  )
  TextC=(
    <div>
    <h6>多个坐标系的支持</h6>
    <p>ECharts 3 开始独立出了“坐标系”的概念，支持了直角坐标系（catesian，同 grid）、极坐标系（polar）、地理坐标系（geo）。图表可以跨坐标系存在，例如折、柱、散点等图可以放在直角坐标系上，也可以放在极坐标系上，甚至可以放在地理坐标系中。</p>
    <h6>移动端的优化</h6>
    <p>流量珍贵的移动端需要图表库的体积尽量小。ECharts 和 ZRender 代码的重构，带来了核心部分体积的减小。ECharts 组件众多，并且后面会持续增加，我们提供了更细粒度的按需打包能力。最小体积缩小为 ECharts 2 的 40%。</p>
    </div>
  )
  TextD=(
    <div>
    <h6>深度的交互式数据探索</h6>
    <p>
    交互是从数据中发掘信息的重要手段。“总览为先，缩放过滤按需查看细节”是数据可视化交互的基本需求。
    </p>
    <p>
    ECharts 一直在交互的路上前进，我们提供了 legend visualMap dataZoom tooltip等组件以及图表附带的漫游，选取等操作提供了数据筛取、视图缩放、展示细节等能力。
    </p>
    <p>
    ECharts 3 中，对这些组件进行了广泛增强，例如支持在数据的各种坐标轴、维度进行数据过滤、缩放，以及在更多的图中采用这些组件。
    </p>
    </div>
  )
  TextE=(
    <div>
    <h6>大数据量的展现</h6>
    <p>
    借助 Canvas 的能力，ECharts 在散点图中能够轻松展现上万甚至上十万的数据。下面的微博签到图中就展现了 100k+ 的签到数据。
    </p>
    <h6>多维数据的支持以及丰富的视觉编码手段</h6>
    <p>
    ECharts 3 开始加强了对多维数据的支持。除了加入了平行坐标等常见的多维数据可视化工具外，对于传统的散点图等，传入的数据也可以是多个维度的。配合视觉映射组件 visualMap 提供的丰富的视觉编码，能够将不同维度的数据映射到颜色，大小，透明度，明暗度等不同的视觉通道。
    </p>
    </div>
  )
  TextF=(
    <div>
    <h6>动态数据</h6>
    <p>
    ECharts 由数据驱动，数据的改变驱动图表展现的改变。因此动态数据的实现也变得异常简单，只需要获取数据，填入数据，ECharts 会找到两组数据之间的差异然后通过合适的动画去表现数据的变化。配合 timeline 组件能够在更高的时间维度上去表现数据的信息。    
    </p>
    <h6>绚丽的特效</h6>
    <p>
    ECharts 针对线数据，点数据等地理数据的可视化提供了吸引眼球的特效。
    </p>
    </div>
  )
  page(type){
      let component = [this.TextA,this.TextB,this.TextC,this.TextD,this.TextE,this.TextF];
      var n = Number(this.state.num);
      if(type=='+'){
          n=n>=component.length-1?component.length-1:n+1;
          this.setState({
              num:n,
              component:component[n]
          })
      }else{
          n=n<=0?0:n-1;
          this.setState({
              num:n,
              component:component[n]
          })
      }
      if(n==component.length-1){
          this.setState({
              echartHide:'echartShow'
          })
      }else{
          this.setState({
              echartHide:'echartHide'
          })
      }
      if(n==0){
          this.setState({
              echartShow:'echartHide'
          })
      }else{
          this.setState({
              echartShow:'echartShow'
          })
      }
  }
  render() {
    return (
      <div className="eChartsDemo1">
        <h5>ECharts 特性</h5>
        {this.state.component||this.TextA}
        <p className={`eChartsDemo1Up ${this.state.echartShow}`} onClick={() => { this.page('-') }}>上一页</p>
        <p className="eChartsDemo1Down" onClick={() => { this.page('+') }}>下一页</p>
        <p className={`eChartsDemo1Back ${this.state.echartHide}`} onClick={() => { }}>返回首页</p>
      </div>
    )
  }
}
