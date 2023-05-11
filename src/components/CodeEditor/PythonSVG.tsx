import * as React from 'react'
const SvgComponent = (props) => (
  <svg
    viewBox="0 0 111 134"
    // objectFit="contain"
    className="mr-1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    // className="h-[55.5805px] w-[67.334px]"
    width={15}
    height={15}
    {...props}
  >
    <defs>
      <linearGradient id="prefix__c">
        <stop
          offset={0}
          style={{
            stopColor: '#b8b8b8',
            stopOpacity: 0.49803922,
          }}
        />
        <stop
          offset={1}
          style={{
            stopColor: '#7f7f7f',
            stopOpacity: 0,
          }}
        />
      </linearGradient>
      <linearGradient id="prefix__a">
        <stop
          offset={0}
          style={{
            stopColor: '#ffd43b',
            stopOpacity: 1,
          }}
        />
        <stop
          offset={1}
          style={{
            stopColor: '#ffe873',
            stopOpacity: 1,
          }}
        />
      </linearGradient>
      <linearGradient id="prefix__b">
        <stop
          offset={0}
          style={{
            stopColor: '#5a9fd4',
            stopOpacity: 1,
          }}
        />
        <stop
          offset={1}
          style={{
            stopColor: '#306998',
            stopOpacity: 1,
          }}
        />
      </linearGradient>
      <linearGradient
        xlinkHref="#prefix__a"
        id="prefix__e"
        x1={150.961}
        x2={112.031}
        y1={192.352}
        y2={137.273}
        gradientTransform="matrix(.56254 0 0 .56797 -14.991 -11.702)"
        gradientUnits="userSpaceOnUse"
      />
      <linearGradient
        xlinkHref="#prefix__b"
        id="prefix__d"
        x1={26.649}
        x2={135.665}
        y1={20.604}
        y2={114.398}
        gradientTransform="matrix(.56254 0 0 .56797 -14.991 -11.702)"
        gradientUnits="userSpaceOnUse"
      />
      <radialGradient
        xlinkHref="#prefix__c"
        id="prefix__f"
        cx={61.519}
        cy={132.286}
        r={29.037}
        fx={61.519}
        fy={132.286}
        gradientTransform="matrix(0 -.23995 1.05467 0 -83.7 142.462)"
        gradientUnits="userSpaceOnUse"
      />
    </defs>
    <path
      d="M54.919 0c-4.584.022-8.961.413-12.813 1.095C30.76 3.099 28.7 7.295 28.7 15.032v10.219h26.813v3.406H18.638c-7.793 0-14.616 4.684-16.75 13.594-2.462 10.213-2.571 16.586 0 27.25 1.905 7.938 6.457 13.594 14.25 13.594h9.218v-12.25c0-8.85 7.657-16.657 16.75-16.657h26.782c7.454 0 13.406-6.138 13.406-13.625v-25.53c0-7.267-6.13-12.726-13.406-13.938C64.282.328 59.502-.02 54.918 0Zm-14.5 8.22c2.77 0 5.031 2.298 5.031 5.125 0 2.816-2.262 5.093-5.031 5.093-2.78 0-5.031-2.277-5.031-5.093 0-2.827 2.251-5.125 5.03-5.125z"
      style={{
        fill: 'url(#prefix__d)',
        fillOpacity: 1,
      }}
    />
    <path
      d="M85.638 28.657v11.906c0 9.231-7.826 17-16.75 17H42.106c-7.336 0-13.406 6.279-13.406 13.625V96.72c0 7.266 6.319 11.54 13.406 13.625 8.488 2.495 16.627 2.946 26.782 0 6.75-1.955 13.406-5.888 13.406-13.625V86.5H55.513v-3.405H95.7c7.793 0 10.696-5.436 13.406-13.594 2.8-8.399 2.68-16.476 0-27.25-1.925-7.758-5.604-13.594-13.406-13.594zM70.575 93.313c2.78 0 5.031 2.278 5.031 5.094 0 2.827-2.251 5.125-5.031 5.125-2.77 0-5.031-2.298-5.031-5.125 0-2.816 2.261-5.094 5.031-5.094z"
      style={{
        fill: 'url(#prefix__e)',
        fillOpacity: 1,
      }}
    />
    <ellipse
      cx={55.817}
      cy={127.701}
      rx={35.931}
      ry={6.967}
      style={{
        opacity: 0.44382,
        fill: 'url(#prefix__f)',
        fillOpacity: 1,
        fillRule: 'nonzero',
        stroke: 'none',
        strokeWidth: 15.4174,
        strokeMiterlimit: 4,
        strokeDasharray: 'none',
        strokeOpacity: 1,
      }}
    />
  </svg>
)
export default SvgComponent
