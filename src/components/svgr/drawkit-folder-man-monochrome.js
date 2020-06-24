import { h } from 'preact';

import withDrawkitStyle from './with-drawkit-style';

function SvgComponent(props) {
  return (
    <svg viewBox="0 0 1200 1200" {...props}>
      <defs>
        <pattern
          id="prefix__New_Pattern"
          data-name="New Pattern"
          width={12}
          height={12}
          patternUnits="userSpaceOnUse"
          viewBox="0 0 12 12"
        >
          <path fill="none" d="M0 0h12v12H0z" />
          <circle className="prefix__cls-2" cx={12} cy={9} r={2} />
          <circle className="prefix__cls-2" cx={6} cy={12} r={2} />
          <circle className="prefix__cls-2" cy={9} r={2} />
          <circle className="prefix__cls-2" cx={12} cy={3} r={2} />
          <circle className="prefix__cls-2" cx={6} cy={6} r={2} />
          <circle className="prefix__cls-2" cy={3} r={2} />
          <circle className="prefix__cls-2" cx={6} r={2} />
        </pattern>
        <style>
          {
            ".prefix__cls-4{fill:none}.prefix__cls-2{fill:#949494}.prefix__cls-3{fill:url(#prefix__New_Pattern)}.prefix__cls-4{stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.5px}.prefix__cls-5{fill:#dfdfdf}.prefix__cls-6{fill:#f3f3f3}.prefix__cls-7{fill:#fff}"
          }
        </style>
      </defs>
      <g id="prefix__Shadows">
        <path
          className="prefix__cls-3"
          d="M1100 542.83c-18 0-63.43 27.69-77.44 70-35.87.7-48-2.84-48-2.84L973 527.77l17.53 2.46 21.54 1 11.24-1.14 9.37-5.91 17.45-15.08 6.81 3.75 4.76-.25 14-12.47 12.49-17.72 13-24.06 1.39 8.16 1.27 23.39-3 46.46zM1006.22 364.2l-20.42-32.06-8.91-24-.5 81.4 5.92-7.62 8.5-8.06 15.41-9.66z"
        />
      </g>
      <g id="prefix__Vector">
        <path d="M1083.21 596.29C1067 606 1010.6 610.24 971.73 608v10.4L1067 959.31h35.79l-19.56-363z" />
        <path d="M1007.86 738.49l-34.07 59.62-8.52-185.26 54.3 1.78-11.71 123.86z" />
        <path
          className="prefix__cls-4"
          d="M1006.21 364.2c-8.53-11.77-24.82-37.9-29.76-57.73-6.34-25.48-6.89 74.58-6.89 74.58l8 7M939.55 483.75c12.82-62.64 40.49-126.66 92.5-124.4M1101.68 457c6.39 60.36-6.32 128.08-15.79 137.3-16.75 16.3-140.1 19.33-152 5.7-4.25-4.87-5.35-39.76-.06-81.53"
        />
        <path className="prefix__cls-5" d="M73 208.9h904.54v251.09H73z" />
        <path
          className="prefix__cls-6"
          d="M890.82 503.37c-5.16 1.88-11.85 2.06-18.65.09-12.88-3.74-21.29-13.76-18.79-22.38s15-12.6 27.84-8.87a31.36 31.36 0 0114.78 8.93c26.75-.25 60.71 4.45 81.53 7.8v-201.7H73v667.49h904.54v-426.2c-38.39-6.08-76.21-20.63-86.72-25.16z"
        />
        <path
          className="prefix__cls-4"
          d="M1058.27 366.36c15 8.25 25.55 23.31 32.62 41.92M1065.21 329.87s-8.93 46.42-9.94 53c-.62 4-15.32 3.86-26.35 1.06M1034.84 350.28a28.85 28.85 0 01-5.14-.49c-21.15-4-33.83-31-28.32-60.42a68.4 68.4 0 0114.28-31.29M1075.47 294.19a12.53 12.53 0 11-11.38 21.14M933.83 518.47c26.29 7.7 59.37 14.71 86.57 12.26 5 .36 20.73-13 29.69-21.49M1011.18 472.28a53.9 53.9 0 00-16.51 19.59c-10.35-1.87-61.48-11.08-98.67-10.73a31.36 31.36 0 00-14.79-8.93c-12.87-3.73-25.34.24-27.84 8.87s5.91 18.64 18.79 22.38c6.8 2 13.49 1.79 18.65-.09a415 415 0 0043 15.1"
        />
        <path
          className="prefix__cls-5"
          d="M627.91 416.4H296.17v538.33h453.7V538.36L627.91 416.4z"
        />
        <circle className="prefix__cls-7" cx={419.37} cy={622.1} r={52.66} />
        <path
          className="prefix__cls-7"
          d="M500.33 662.68h179v14.15h-179zM366.71 725.96h312.63v14.15H366.71zM366.71 789.23h312.63v14.15H366.71z"
        />
        <path
          className="prefix__cls-6"
          d="M653.79 188.28c0 11.32-34.84 99-220.35 99 0 18.9 230.1 9.37 230.1 9.37l3.4-106.54z"
        />
        <path
          className="prefix__cls-4"
          d="M1058.91 412.41c16.18-7.21 32.47-8.7 43.12 3.28 23 25.92-33.5 100.44-44.39 97.36-12.83-3.63-51.87-40.17-52.18-52.82M1089.61 303.56c7.39-3.7 14-36.82-.59-50.43-14.24-13.25-61.7-28.67-80.09-46.86M1017.67 238.62c-4.23-4.15-15.89-26.38-17.48-32.17M1002 244.24c-4.35-6.33-6.52-16.42-7.12-23.14"
        />
        <ellipse cx={1031.88} cy={288.59} rx={2.96} ry={3.42} />
        <path
          className="prefix__cls-4"
          d="M1019.88 282.64c-.66 3.63-4.29 13.34-9.69 21.54M1021.43 321.2a9.38 9.38 0 007.49-4.85M1072.11 959.32v27.11l45.33 62.74-22.67-74.99v-14.86"
        />
        <path
          className="prefix__cls-6"
          d="M953 163.74h-29.75a19.21 19.21 0 012.21 8.92c0 12.18-11.54 22.05-25.78 22.05s-25.77-9.87-25.77-22.05a19.33 19.33 0 012.2-8.92H678.32a24.54 24.54 0 00-24.53 24.54V289a24.54 24.54 0 0024.53 24.54H953A24.54 24.54 0 00977.54 289V188.28A24.54 24.54 0 00953 163.74z"
        />
        <ellipse
          className="prefix__cls-4"
          cx={899.68}
          cy={172.66}
          rx={25.77}
          ry={22.05}
        />
      </g>
    </svg>
  );
}

export default withDrawkitStyle(SvgComponent);