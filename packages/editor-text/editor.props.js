export default {
  props: {
    id: { type: String, default: String(new Date().getTime()) },
    width: String,
    height: String,
    minWidth: Number,
    minHeight: { type: Number, default: 200 },
    items: {
      type: Array,
      default () {
        return [
          'source', '|', 'undo', 'redo', '|', 'preview', 'template', 'code', 'cut', 'copy', 'paste',
          'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
          'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
          'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
          'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
          'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image',
          'flash', 'media', 'table', 'hr', 'pagebreak',
          'anchor', 'link', 'unlink'
        ]
      }
    },
    noDisableItems: { type: Array, default () { return [ 'source', 'fullscreen' ] } },
    filterMode: { type: Boolean, default: true },
    htmlTags: {
      type: Object,
      default () {
        return {
          font: [ 'color', 'size', 'face', '.background-color' ],
          span: [ 'style' ],
          div: [ 'class', 'align', 'style' ],
          table: [ 'class', 'border', 'cellspacing', 'cellpadding', 'width', 'height', 'align', 'style' ],
          'td,th': [ 'class', 'align', 'valign', 'width', 'height', 'colspan', 'rowspan', 'bgcolor', 'style' ],
          a: [ 'class', 'href', 'target', 'name', 'style' ],
          embed: [ 'src', 'width', 'height', 'type', 'loop', 'autostart', 'quality',
            'style', 'align', 'allowscriptaccess', '/' ],
          img: [ 'src', 'width', 'height', 'border', 'alt', 'title', 'align', 'style', '/' ],
          hr: [ 'class', '/' ],
          br: [ '/' ],
          'p,ol,ul,li,blockquote,h1,h2,h3,h4,h5,h6': [ 'align', 'style' ],
          'tbody,tr,strong,b,sub,sup,em,i,u,strike': []
        }
      }
    },
    wellFormatMode: { type: Boolean, default: true },
    resizeType: { type: Number, default: 0 },
    themeType: { type: String, default: 'default' },
    langType: { type: String, default: 'zh-CN' },
    designMode: { type: Boolean, default: true },
    fullscreenMode: { type: Boolean, default: false },
    basePath: String,
    themesPath: String,
    pluginsPath: { type: String, default: 'http://kindeditor.net/ke4/plugins/' },
    langPath: String,
    minChangeSize: { type: Number, default: 5 },
    loadStyleMode: { type: Boolean, default: true },
    urlType: String,
    newlineTag: { type: String, default: 'p' },
    pasteType: { type: Number, default: 2 },
    dialogAlignType: { type: String, default: 'page' },
    shadowMode: { type: Boolean, default: true },
    zIndex: { type: Number, default: 811213 },
    useContextmenu: { type: Boolean, default: true },
    syncType: { type: String, default: 'form' },
    indentChar: { type: String, default: '\t' },
    cssPath: [ String, Array ],
    cssData: String,
    bodyClass: { type: String, default: 'ke-content' },
    colorTable: Array,
    afterTab: Function,
    afterFocus: Function,
    afterBlur: Function,
    afterUpload: Function,
    uploadJson: { type: String, default: '/api/security/upload/image' },
    fileManagerJson: String,
    allowPreviewEmoticons: { type: Boolean, default: true },
    allowImageUpload: { type: Boolean, default: true },
    allowFlashUpload: { type: Boolean, default: true },
    allowMediaUpload: { type: Boolean, default: true },
    allowFileUpload: { type: Boolean, default: true },
    allowFileManager: { type: Boolean, default: false },
    fontSizeTable: {
      type: Array,
      default () {
        return [ '9px', '10px', '12px', '14px', '16px', '18px', '24px', '32px' ]
      }
    },
    imageTabIndex: { type: Number, default: 0 },
    formatUploadUrl: { type: Boolean, default: true },
    fullscreenShortcut: { type: Boolean, default: false },
    extraFileUploadParams: { type: Object, default () { return {} } },
    filePostName: { type: String, default: 'file' },
    fillDescAfterUploadImage: { type: Boolean, default: false },
    afterSelectFile: Function,
    pagebreakHtml: {
      type: String,
      default: '<hr style="page-break-after: always;" class="ke-pagebreak" />'
    },
    allowImageRemote: { type: Boolean, default: true },
    autoHeightMode: { type: Boolean, default: false },
    fixToolBar: { type: Boolean, default: false },
    tabIndex: Number
  }
}
