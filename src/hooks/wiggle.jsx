
Project Summary: @today
  ☐ Add material UI (mateiral ui kit 2) @today
  ☐ Add card game @today
    ☐ https://github.com/inooid/react-redux-card-game
    ☐ https://reactjsexample.com/a-simple-pokemon-catalogue-built-with-react-and-material-ui/
  ☐ Use Redux @critical (https://redux.js.org/tutorials/essentials/part-3-data-flow)

  ☐ Add Firebase-Firestore
    ☐ https://qiita.com/momosuke/items/0fa933f8b6e470e5796d
  ☐ Other
  ☐ env
    ☐ https://adostes.medium.com/using-environment-variables-in-a-react-application-ac3b6c307373
Project Game:
  ☐ https://github.com/chrisssf/react_RolePlayingGame
Project example: @today
  ✔ context - language @done(22-05-26 10:32)
  ✔ connect - firebase @done(22-05-26 11:24)

-----------------------------------------------------
-----------------------------------------------------
ProjectWork:
  Admin(teacher):manager:
  User(student):study:
  Feature:
    ☐ test leo rank theo level(hiragana, katakana, kanji)
      ☐ hiragana: cach doc, example, y nghia
DB:
  CardJP
Project Main:
  component_material_example:
    ☐ Box
    ☐ Typography
    ☐ Button
    ☐ Input
    ☐ switch @today
    ☐ checkbox @today
    ☐ card @today
    ✔ transitions_avatar @done(22-06-02 14:28)
    ☐ Avatar
  component_base:
    ☐ TTBox
    ☐ TTTypography
    ☐ TTButton
    ☐ TTInput
    ☐ TTAvatar
  component_project:
    ✔ DefaultNavbar @done(22-06-01 15:01)
    ☐ DashboardNavbar
    ✔ sideNavibar @done(22-06-02 17:10)
    ✔ ConfigNavbar @done(22-06-02 14:28)
    ☐ Table (Data Table)
      ☐ table simple
      ☐ table enhanced
      ☐ table bea
  theme:
    common:
      ☐ color
      ☐ border
      
    ☐ component_theme
      ☐ autocomplete
      ☐ checkbox
      ☐ formControlLabel
      ☐ formLabel
      ☐ input
      ☐ inputLabel
      ☐ inputOutlined
      ☐ radio
      ☐ select
      ☐ switchButton
      ☐ textField
      ✔ card @done(22-06-01 09:21)
      ✔ button @done(22-06-01 09:21)
      ✔ typography @done(22-06-01 09:21)
      ✔ box @done(22-06-01 09:21)
    
  layout:
    ✔ pageLayout @done(22-06-01 13:42)
    ✔ basicLayout (sign in page) @done(22-06-01 13:42)
    ✔ coverLayout (sign up pay) @done(22-06-01 13:42)
    ✔ dashboardLayout @done(22-06-06 14:15)
  page:
    ☐ sign in
    ☐ sign up 
    ☐ sign reset password
    ☐ intro (gioi thieu web)
    ☐ plan (ke hoach hoc tap)
    ☐ dashboard _ follow and manage study time (manage time-tien do tomtat content da hoc tap)
    ☐ profile _ (thanh tich, result)
    ☐ nitification _ alert task (thong bao cac task, tien trinh)
    ☐ tables (noi dung hoc tap, noi dung tham khao)



Tip performance:
  ☐ Render time ( do thoi gian render)_ User Timing API (List 1000Item)
  ☐ use build production 
      npm run build
      npm start.
  ☐ Không dùng index để gán vào key
  ☐ useEffect() và useCallback()
  ☐ Ghi nhớ component
  ☐ React.Fragments ( <></>)
  ☐ Lazy loading
  ☐ Image loading
  ☐ Dùng Js animations thay vì CSS animations
  ☐ Ảo hóa những danh sách dài
  ☐ Utilise render bail-out techniques(cha update -> con update): memo
  // index.jsx
  export default function ParentComponent(props) {
    return (
      <div>
        <SomeComponent someProp={props.somePropValue}
      <div>
        <AnotherComponent someOtherProp={props.someOtherPropValue} />
      </div>
     </div>
   )
  }
  
  
  // ./SomeComponent.jsx
  export default function SomeComponent(props) {
    return (
      <div>{props.someProp}</div>  
    )
  }
  
  // --------------------------------------------
  
  // ./AnotherComponent.jsx (1)
  // Component này sẽ render mỗi khi `props.somePropValue` thay đổi
  // Kể cả `props.someOtherPropValue` có thay đổi hay không
  export default function AnotherComponent(props) {
    return (
      <div>{props.someOtherProp}</div>  
    )
  }
  
  // ./AnotherComponent.jsx (2)
  // Component này sẽ chỉ render lại khi `props` thay đổi
  export default memo((props) => {
    return (
      <div>{props.someOtherProp}</div>  
    )
  });
  
  // ./AnotherComponent.jsx (3)
  // Component này cũng sẽ chỉ render lâij khi `props` thay đổi
  class AnotherComponent extends React.PureComponent {
    render() {
      return <div>{this.props.someOtherProp}</div>   
    }
  }
  
  // ./AnotherComponent.jsx (4)
  // Giống bên trên
  class AnotherComponent extends React.PureComponent {
    shouldComponentUpdate(nextProps) {
      return this.props !== nextProps
    }
    
    render() {
      return <div>{this.props.someOtherProp}</div>   
    }
  }
  ☐ Avoid inline objects ( inline: ()=>{}) 
  // Không nên
  function Component(props) {
    const aProp = { someProp: 'someValue' }
    return <AnotherComponent style={{ margin: 0 }} aProp={aProp} />  
  }

  // Nên
  const styles = { margin: 0 };
  function Component(props) {
    const aProp = { someProp: 'someValue' }
    return <AnotherComponent style={styles} {...aProp} />  
  }
  ☐ Avoid anonymous functions
  // Không nên
  function Component(props) {
    return <AnotherComponent onChange={() => props.callback(props.id)} />  
  }
  
  // Nên
  function Component(props) {
    const handleChange = useCallback(() => props.callback(props.id), [props.id]);
    return <AnotherComponent onChange={handleChange} />  
  }
  
  // Nên
  class Component extends React.Component {
    handleChange = () => {
     this.props.callback(this.props.id) 
    }
    
    render() {
      return <AnotherComponent onChange={this.handleChange} />
    }
  }
  ☐ Lazy load components that are not instantly needed

  / ./Tooltip.jsx
  const MUITooltip = React.lazy(() => import('@material-ui/core/Tooltip'));
  function Tooltip({ children, title }) {
    return (
      <React.Suspense fallback={children}>
        <MUITooltip title={title}>
          {children}
        </MUITooltip>
      </React.Suspense>
    );
  }
  
  // ./Component.jsx
  function Component(props) {
    return (
      <Tooltip title={props.title}>
        <AnotherComponent />
      </Tooltip>
    )
  }
  ☐ Tweak CSS instead of forcing a component to mount & unmount
  // Tránh làm thế này với component quá nặng cho việc mount/unmount
  // Hồi trước mình cũng mắc phải lỗi này
  function Component(props) {
    const [view, setView] = useState('view1');
    return view === 'view1' ? <SomeComponent /> : <AnotherComponent />  
  }

  // Do this instead if you' re opting for speed & performance gains
  // Thay vào đó hãy sử dụng cách này để tăng tốc độ và hiệu suất
  const visibleStyles = { opacity: 1 };
  const hiddenStyles = { opacity: 0 };
  function Component(props) {
    const [view, setView] = useState('view1');
    return (
      <React.Fragment>
        <SomeComponent style={view === 'view1' ? visibleStyles : hiddenStyles}>
        <AnotherComponent style={view !== 'view1' ? visibleStyles : hiddenStyles}>
      </React.Fragment>
    )
  }

  ☐ Memoize expensive calculations
  // không nên
  function Component(props) {
    const someProp = heavyCalculation(props.item);
    return <AnotherComponent someProp={someProp} /> 
  }
    
  // Nên, `someProp` sẽ tính toán lại
  // chỉ có `props.item` thay đổi
  function Component(props) {
    const someProp = useMemo(() => heavyCalculation(props.item), [props.item]);
    return <AnotherComponent someProp={someProp} /> 
  }
  ☐ Không nên sử dụng indexes làm keys (Don't use array indexes as keys)
  ☐ Giá trị tham chiếu muộn (Dereference values late)
  Chậm hơn

    <DisplayName name={person.name} />
    
    Nhanh hơn
    
    <DisplayName person={person} />
    ☐ PureComponent and React Hooks