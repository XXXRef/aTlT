import React from 'react'
import verCfg from '../../app_config.json' with { type: 'json' };


const versionInfo = verCfg.versionInfo;


export default function Footer() {
  return (
    <div id="div_footer">
      <div id="div_footer_leftpart">
        atlt v{versionInfo.versionNumber} b:{versionInfo.branch} base_commit_id:{versionInfo.commit}
      </div>
      <div id="div_footer_rightpart"><span><a href="https://oiledowl.com">OiledOwl corp.</a> , 2022</span></div>
    </div>
  )
}
