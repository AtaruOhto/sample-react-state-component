// Reactをインポート。
import React from 'react';
// ReactのDOMプラグインをインポート。
import ReactDOM from 'react-dom';

// オブジェクトのマージ用途のみ
import assign from 'object-assign';

// React.Componentを継承する形でコンポーネントを定義する。
class MenuComponent extends React.Component {

  //コンストラクタ
  constructor() {
    // 親を呼び出す
    super();
    //ボタンの状態を変数として内部で持っておく。updateBtnStyle()で使用
    this.btnTypeState = 1;
    //ボタンが最大で何パターン変化するかを定義。prepareBtnStyles()内部で定義
    this.maxTypeState;
    // ボタンにかけるスタイルを準備する。
    this.prepareBtnStyles();
    // コンポーネントの初期の状態を定義
    this.setInitialState();
  }

  generateStyleObject (keys, propery) {
    var obj = {};
    keys.forEach((key) => {
      obj[key] = propery;
    });
    return obj;
  }

  prepareBtnStyles() {
    let transitionKeys = ['transition', 'msTransition', 'MozTransition', 'OTransition', 'WebkitTransition'];
    let transformKeys  = ['transform', 'msTransform', 'MozTransform', 'Otransform', 'WebkitTransform'];

    //アニメーションの基本スタイル
    let animationBase = this.generateStyleObject(transitionKeys, 'all cubic-bezier(0.1, 0.9, 0.1, 1) 0.6s');

    // 1回目にクリックした時にかける追加スタイル
    let modifier1 = this.generateStyleObject(transformKeys, 'translate3d(-100px, 0, 0)');
    // 2回目にクリックした時にかける追加スタイル
    let modifier2 = this.generateStyleObject(transformKeys, 'translate3d(0, -100px, 0)');
    // 3回目にクリックした時にかける追加スタイル
    let modifier3 = this.generateStyleObject(transformKeys, 'translate3d(100px, 0, 0)');

    // ボタンの基本スタイル
    let styleBase = {
        position: 'absolute',
        width : '200px',
        height : '50px',
        lineHeight: '50px',
        textAlign : 'center',
        backgroundColor : '#000',
        borderRadius: '6px',
        boxShadow: ' 6px 9px 10px -8px #333',
        userSelect: 'none',
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        MsUserSelect: 'none',
        cursor: 'pointer'
    }

    let objIdx = 1;
    const OBJ_NAME = 'btnStyleParentEnterActive';

    // 各ボタンのスタイルをまとめたオブジェクト
    this.btnStyles =  {
      //btnStyleParentEnterActive1
      [OBJ_NAME + objIdx++] : assign(
        {},
        animationBase,
        styleBase,
        {
          backgroundColor: '#009688'
        }),

      //btnStyleParentEnterActive2
       [OBJ_NAME + objIdx++] : assign(
        {},
        animationBase,
        modifier1,
        styleBase,
        {
          backgroundColor: '#1A237E'
        }),

      //btnStyleParentEnterActive3
       [OBJ_NAME + objIdx++] : assign(
        {},
        animationBase,
        modifier2,
        styleBase,
        {
          backgroundColor : '#D50000'
        }),

      //btnStyleParentEnterActive4
      [OBJ_NAME + objIdx++] : assign(
        {},
        animationBase,
        modifier3,
        styleBase,
        {
          backgroundColor : '#37474F'
        }
      ),

      //ボタンのテキストのスタイル
      btnStyleChild: {
        color: '#F1F1F1',
        fontWeight: 'bold'
      }

    }

    // 最大変化パターン数を代入しておく。
    this.maxTypeState = --objIdx;

  }

  // 最初のstate (状態) を定義する
  setInitialState() {
    this.state = {
      btnStyle : this.btnStyles.btnStyleParentEnterActive1,
      btnTextStyle : this.btnStyles.btnStyleChild
    };
  }

  // ユーザーのクリックイベントに反応して、対応するスタイルをボタンにかける関数。
  updateBtnStyle() {

    var targetStyle;

    // 最大変化パターン数に達した場合には、ボタンの状態を初期状態 (1) に戻す。
    if(this.btnTypeState >= this.maxTypeState) {
      this.btnTypeState = 1;
    } else {
      this.btnTypeState++;
    }

    /* setStateで btnStyle に新しいstateを設定する。stateを再設定することによりボタンのスタイルが変わってReactによる再描画が走る。
      ユーザーがクリックするたびに下記のように btnStyle のstateが切り替わる。
      this.setState({ btnStyle : this.btnStyles[btnStyleParentEnterActive1]});
      this.setState({ btnStyle : this.btnStyles[btnStyleParentEnterActive2]});
      ......
    */
    this.setState({ btnStyle : this.btnStyles[`btnStyleParentEnterActive${ this.btnTypeState }`] });
  }

  render() {
    /* このコンポーネントがどのように描画されるかを定義する。styleには動的にスタイルを変更できるように this.state.btnStyle を持たせる。
      また、div要素をクリックした時には updateBtnStyle() 関数が呼び出される。コンテキストとしてthisをバインドする。
      <div style={this.state.btnStyle} onClick={this.updateBtnStyle.bind(this)} >
        <a style={this.state.btnTextStyle}>Click Me!</a>
      </div>
    */
    return(
      <div style={this.state.btnStyle} onClick={this.updateBtnStyle.bind(this)} >
        <a style={this.state.btnTextStyle}>Click Me!</a>
      </div>
    )
  }
}

ReactDOM.render(
  // コンポーネントを指定
  <MenuComponent />,
  // コンポーネントの親DOMを指定
  document.querySelector('#react-elem-holder')
);
