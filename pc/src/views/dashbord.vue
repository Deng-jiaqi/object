<template>
  <div id="dashbord-box" v-cloak>
    <!-- 顶部 -->
    <div class="content" id="Home">
      <div class="content-top">
        <ul>
          <li>
            <span class="content-top-span">{{$t('lang.dashbord.text5')}}</span>
            <span class="content-top-span1">{{$t('lang.dashbord.text6')}}</span>
          </li>
          <li class="content-top-ul-li">
            <span class="content-top-span">{{$t('lang.dashbord.text7')}}</span>
            <img class="content-top-img1" src="../assets/images/fff.png" alt />
            <img class="content-top-img2" src="../assets/images/ggg.png" alt />
          </li>
        </ul>
      </div>
      <div style="position:absolute;top:5px;" ref="bigbox"></div>
      <div class="content-headline">
        <span class="content-headline-span">{{$t('lang.dashbord.text8')}}</span>
        <ul class="content-headline-ul">
          <li
            class="navigation-li"
            @click="goAnchor('Home')"
            :class="activeNavigation==='Home'?'navigation-li-active':''"
          >{{$t('lang.dashbord.text9')}}</li>
          <li @click="toLoginAdmin" class="navigation-li">{{$t('lang.dashbord.text2')}}</li>
          <li
            @click="goAnchor('about')"
            class="navigation-li"
            :class="activeNavigation==='about'?'navigation-li-active':''"
          >{{$t('lang.dashbord.text10')}}</li>
          <li
            class="navigation-li"
            @click="goAnchor('Services')"
            :class="activeNavigation==='Services'?'navigation-li-active':''"
          >{{$t('lang.dashbord.text11')}}</li>
          <el-popover placement="bottom" v-model="languageSwitchVisible">
            <ul class="yuyan">
              <li class="popover-language" @click="tabLang('zh-cn')">{{$t('lang.dashbord.text17')}}</li>

              <li class="popover-language" @click="tabLang('en-us')">{{$t('lang.dashbord.text18')}}</li>
            </ul>
            <li
              class="popover-language-reference navigation-li"
              slot="reference"
            >{{$t('lang.dashbord.text12')}}</li>
          </el-popover>
          <li
            class="navigation-li"
            @click="goAnchor('Contactus')"
            :class="activeNavigation==='Contactus'?'navigation-li-active':''"
          >{{$t('lang.dashbord.text13')}}</li>
          <li class="navigation-li" @click="toHelp">{{$t('lang.dashbord.text14')}}</li>
        </ul>
      </div>
      <div class="content-text">
        <h1
          class="content-text-h1"
          ref="contentTextH1"
          style="visibility:hidden"
        >{{$t('lang.dashbord.text15')}}</h1>
        <p
          class="content-text-p"
          ref="contentTextP"
          style="visibility:hidden"
        >{{$t('lang.dashbord.text16')}}</p>
        <button
          @click="toRegister"
          class="button button-lg button-gradient button-ujarak"
          ref="toRegisterBtn"
          style="visibility:hidden"
        >{{$t('lang.dashbord.text1')}}</button>
      </div>
    </div>
    <!-- 分栏 -->
    <section class="section section-lg bg-white">
      <div class="container">
        <div class="row row-50 justify-content-md-center justify-content-lg-start">
          <div class="col-md-10 col-lg-6 wow-outer">
            <div class="wow" ref="introductionLeft" style="visibility:hidden">
              <div class="image-custom-1">
                <img class="image-custom-1-img" src="../assets/images/img.png" alt width="651" />
              </div>
            </div>
          </div>
          <div class="col-md-10 col-lg-6 wow-outer" id="about">
            <div class="box-inset-1 wow" ref="introductionRight" style="visibility:hidden">
              <div
                class="tabs-custom tabs-horizontal tabs-corporate tabs-corporate_left"
                id="tabs-about"
              >
                <ul class="nav nav-tabs">
                  <li class="nav-item">
                    <a class="nav-link active" data-toggle="tab">{{$t('lang.dashbord.text20')}}</a>
                  </li>
                  <li
                    class="nav-item"
                    @click="goAnchor('tabs-about-2')"
                    :class="activeNavigation==='tabs-about-2'?'navigation-li-active':''"
                  >
                    <a class="nav-link" data-toggle="tab">{{$t('lang.dashbord.text21')}}</a>
                  </li>
                  <li
                    class="nav-item"
                    @click="goAnchor('Services')"
                    :class="activeNavigation==='Services'?'navigation-li-active':''"
                  >
                    >
                    <a class="nav-link" data-toggle="tab">{{$t('lang.dashbord.text23')}}</a>
                  </li>
                </ul>
                <div class="tab-content">
                  <div class="tab-pane fade show active">
                    <h4>{{$t('lang.dashbord.text24')}}</h4>
                    <p>{{$t('lang.dashbord.text25')}}</p>
                    <p>{{$t('lang.dashbord.text26')}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 数字 -->
    <!-- Facts-->
    <section
      class="section parallax-container bg-gray-darker"
      data-parallax-img="../utils/images/bg-image-2-1920x1121.jpg"
    >
      <div class="parallax-content">
        <div class="section-lg text-center">
          <div class="container numberContainer">
            <div class="row row-30 offset-top-1">
              <div class="col-sm-6 col-md-3 wow-outer">
                <div class="wow" ref="boxCounterOne" style="visibility:hidden">
                  <!-- Box counter-->
                  <article class="box-counter">
                    <div class="box-counter__main">
                      <span>{{boxCounterOneString}}</span>
                      <span class="small">{{$t('lang.dashbord.text28')}}</span>
                    </div>
                    <div class="box-counter__divider"></div>
                    <p class="box-counter__title">{{$t('lang.dashbord.text29')}}</p>
                  </article>
                </div>
              </div>
              <div class="col-sm-6 col-md-3 wow-outer">
                <div class="wow" ref="boxCounterTwo" style="visibility:hidden">
                  <!-- Box counter-->
                  <article class="box-counter">
                    <div class="box-counter__main">
                      <div class="counter">
                        <span>{{boxCounterTwoString}}</span>
                      </div>
                    </div>
                    <div class="box-counter__divider"></div>
                    <p class="box-counter__title">{{$t('lang.dashbord.text31')}}</p>
                  </article>
                </div>
              </div>
              <div class="col-sm-6 col-md-3 wow-outer">
                <div class="wow" ref="boxCounterThree" style="visibility:hidden">
                  <!-- Box counter-->
                  <article class="box-counter">
                    <div class="box-counter__main">
                      <div class="counter">
                        <span>{{boxCounterThreeString}}</span>
                      </div>
                    </div>
                    <div class="box-counter__divider"></div>
                    <p class="box-counter__title">{{$t('lang.dashbord.text33')}}</p>
                  </article>
                </div>
              </div>
              <div class="col-sm-6 col-md-3 wow-outer">
                <div class="wow" ref="boxCounterFour" style="visibility:hidden">
                  <!-- Box counter-->
                  <article class="box-counter">
                    <div class="box-counter__main">
                      <div class="counter">
                        <span>{{boxCounterFourString}}</span>
                      </div>
                      <span class="small small_top">{{$t('lang.dashbord.text35')}}</span>
                    </div>
                    <div class="box-counter__divider"></div>
                    <p class="box-counter__title">{{$t('lang.dashbord.text36')}}</p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- whyChooseUs -->
    <section class="section section-md text-center bg-gray-lighter" id="tabs-about-2">
      <div class="container">
        <h2 class="wow-outer">
          <span
            class="wow"
            ref="whyChooseTitle"
            style="visibility:hidden"
          >{{$t('lang.dashbord.text37')}}</span>
        </h2>
        <div class="row row-30 row-md-70 wow" ref="whyChooseContent" style="visibility:hidden">
          <div class="col-md-6 col-lg-4">
            <!-- Box Lucy-->
            <article class="box-lucy box-lucy-one">
              <div class="box-lucy__aside">
                <div class="box-lucy__icon-outer">
                  <svg
                    class="box-lucy__icon-shape"
                    xmlns="http://www.w3.org/2000/svg"
                    width="59px"
                    height="68px"
                  >
                    <path
                      fill-rule="evenodd"
                      stroke-width="2px"
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      fill="none"
                      d="M29.000,66.000 L1.012,49.750 L1.012,17.250 L29.000,1.000 L56.988,17.250 L56.988,49.750 L29.000,66.000 Z"
                    />
                  </svg>
                  <span class="box-lucy__icon fl-bigmug-line-gear30"></span>
                </div>
                <h5 class="box-lucy__title">{{$t('lang.dashbord.text38')}}</h5>
              </div>
              <div class="box-lucy__main">
                <p>{{$t('lang.dashbord.text39')}}</p>
              </div>
            </article>
          </div>
          <div class="col-md-6 col-lg-4">
            <!-- Box Lucy-->
            <article class="box-lucy box-lucy-two">
              <div class="box-lucy__aside">
                <div class="box-lucy__icon-outer">
                  <svg
                    class="box-lucy__icon-shape"
                    xmlns="http://www.w3.org/2000/svg"
                    width="59px"
                    height="68px"
                  >
                    <path
                      fill-rule="evenodd"
                      stroke-width="2px"
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      fill="none"
                      d="M29.000,66.000 L1.012,49.750 L1.012,17.250 L29.000,1.000 L56.988,17.250 L56.988,49.750 L29.000,66.000 Z"
                    />
                  </svg>
                  <span class="box-lucy__icon fl-bigmug-line-headphones32"></span>
                </div>
                <h5 class="box-lucy__title">{{$t('lang.dashbord.text40')}}</h5>
              </div>
              <div class="box-lucy__main">
                <p>{{$t('lang.dashbord.text41')}}</p>
              </div>
            </article>
          </div>
          <div class="col-md-6 col-lg-4">
            <!-- Box Lucy-->
            <article class="box-lucy box-lucy-three">
              <div class="box-lucy__aside">
                <div class="box-lucy__icon-outer">
                  <svg
                    class="box-lucy__icon-shape"
                    xmlns="http://www.w3.org/2000/svg"
                    width="59px"
                    height="68px"
                  >
                    <path
                      fill-rule="evenodd"
                      stroke-width="2px"
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      fill="none"
                      d="M29.000,66.000 L1.012,49.750 L1.012,17.250 L29.000,1.000 L56.988,17.250 L56.988,49.750 L29.000,66.000 Z"
                    />
                  </svg>
                  <span class="box-lucy__icon fl-bigmug-line-circular229"></span>
                </div>
                <h5 class="box-lucy__title">{{$t('lang.dashbord.text42')}}</h5>
              </div>
              <div class="box-lucy__main">
                <p>{{$t('lang.dashbord.text43')}}</p>
              </div>
            </article>
          </div>
          <div class="col-md-6 col-lg-4">
            <!-- Box Lucy-->
            <article class="box-lucy box-lucy-four">
              <div class="box-lucy__aside">
                <div class="box-lucy__icon-outer">
                  <svg
                    class="box-lucy__icon-shape"
                    xmlns="http://www.w3.org/2000/svg"
                    width="59px"
                    height="68px"
                  >
                    <path
                      fill-rule="evenodd"
                      stroke-width="2px"
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      fill="none"
                      d="M29.000,66.000 L1.012,49.750 L1.012,17.250 L29.000,1.000 L56.988,17.250 L56.988,49.750 L29.000,66.000 Z"
                    />
                  </svg>
                  <span class="box-lucy__icon box-lucy__icon-md fl-bigmug-line-lock64"></span>
                </div>
                <h5 class="box-lucy__title">{{$t('lang.dashbord.text44')}}</h5>
              </div>
              <div class="box-lucy__main">
                <p>{{$t('lang.dashbord.text45')}}</p>
              </div>
            </article>
          </div>
          <div class="col-md-6 col-lg-4">
            <!-- Box Lucy-->
            <article class="box-lucy box-lucy-five">
              <div class="box-lucy__aside">
                <div class="box-lucy__icon-outer">
                  <svg
                    class="box-lucy__icon-shape"
                    xmlns="http://www.w3.org/2000/svg"
                    width="59px"
                    height="68px"
                  >
                    <path
                      fill-rule="evenodd"
                      stroke-width="2px"
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      fill="none"
                      d="M29.000,66.000 L1.012,49.750 L1.012,17.250 L29.000,1.000 L56.988,17.250 L56.988,49.750 L29.000,66.000 Z"
                    />
                  </svg>
                  <span class="box-lucy__icon box-lucy__icon-sm fl-bigmug-line-email64"></span>
                </div>
                <h5 class="box-lucy__title">{{$t('lang.dashbord.text46')}}</h5>
              </div>
              <div class="box-lucy__main">
                <p>{{$t('lang.dashbord.text47')}}</p>
              </div>
            </article>
          </div>
          <div class="col-md-6 col-lg-4">
            <!-- Box Lucy-->
            <article class="box-lucy box-lucy-six">
              <div class="box-lucy__aside">
                <div class="box-lucy__icon-outer">
                  <svg
                    class="box-lucy__icon-shape"
                    xmlns="http://www.w3.org/2000/svg"
                    width="59px"
                    height="68px"
                  >
                    <path
                      fill-rule="evenodd"
                      stroke-width="2px"
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      fill="none"
                      d="M29.000,66.000 L1.012,49.750 L1.012,17.250 L29.000,1.000 L56.988,17.250 L56.988,49.750 L29.000,66.000 Z"
                    />
                  </svg>
                  <span class="box-lucy__icon fl-bigmug-line-cloud255"></span>
                </div>
                <h5 class="box-lucy__title">{{$t('lang.dashbord.text48')}}</h5>
              </div>
              <div class="box-lucy__main">
                <p>{{$t('lang.dashbord.text49')}}</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
    <!-- Our Services -->
    <section class="section section-sm bg-white" id="Services">
      <div class="container">
        <h2 class="wow-outer text-center">
          <span
            class="wow"
            ref="ourServicesTitle"
            style="visibility:hidden"
          >{{$t('lang.dashbord.text50')}}</span>
        </h2>
        <div class="row row-30 wow" ref="ourServicesContent" style="visibility:hidden">
          <div class="col-md-6 col-lg-4">
            <!-- Box Alice-->
            <article class="box-alice">
              <div class="box-alice__inner">
                <div class="box-alice__aside">
                  <div class="box-alice__icon-outer">
                    <span class="box-alice__icon fl-bigmug-line-chat51"></span>
                  </div>
                </div>
                <div class="box-alice__main">
                  <h5 class="box-alice__title">{{$t('lang.dashbord.text51')}}</h5>
                  <p class="box-alice__title-P">{{$t('lang.dashbord.text52')}}</p>
                </div>
              </div>
            </article>
          </div>
          <div class="col-md-6 col-lg-4">
            <!-- Box Alice-->
            <article class="box-alice">
              <div class="box-alice__inner">
                <div class="box-alice__aside">
                  <div class="box-alice__icon-outer">
                    <span class="box-alice__icon fl-bigmug-line-three142"></span>
                  </div>
                </div>
                <div class="box-alice__main">
                  <h5 class="box-alice__title">{{$t('lang.dashbord.text53')}}</h5>
                  <p class="box-alice__title-P">{{$t('lang.dashbord.text54')}}</p>
                </div>
              </div>
            </article>
          </div>
          <div class="col-md-6 col-lg-4">
            <!-- Box Alice-->
            <article class="box-alice">
              <div class="box-alice__inner">
                <div class="box-alice__aside">
                  <div class="box-alice__icon-outer">
                    <span class="box-alice__icon fl-bigmug-line-graphical8"></span>
                  </div>
                </div>
                <div class="box-alice__main">
                  <h5 class="box-alice__title">{{$t('lang.dashbord.text55')}}</h5>
                  <p class="box-alice__title-P">{{$t('lang.dashbord.text56')}}</p>
                </div>
              </div>
            </article>
          </div>
          <div class="col-md-6 col-lg-4">
            <!-- Box Alice-->
            <article class="box-alice">
              <div class="box-alice__inner">
                <div class="box-alice__aside">
                  <div class="box-alice__icon-outer">
                    <span class="box-alice__icon fl-bigmug-line-circular228"></span>
                  </div>
                </div>
                <div class="box-alice__main">
                  <h5 class="box-alice__title">{{$t('lang.dashbord.text57')}}</h5>
                  <p class="box-alice__title-P">{{$t('lang.dashbord.text58')}}</p>
                </div>
              </div>
            </article>
          </div>
          <div class="col-md-6 col-lg-4">
            <!-- Box Alice-->
            <article class="box-alice">
              <div class="box-alice__inner">
                <div class="box-alice__aside">
                  <div class="box-alice__icon-outer">
                    <span class="box-alice__icon fl-bigmug-line-favourites5"></span>
                  </div>
                </div>
                <div class="box-alice__main">
                  <h5 class="box-alice__title">{{$t('lang.dashbord.text59')}}</h5>
                  <p class="box-alice__title-P">{{$t('lang.dashbord.text60')}}</p>
                </div>
              </div>
            </article>
          </div>
          <div class="col-md-6 col-lg-4">
            <!-- Box Alice-->
            <article class="box-alice">
              <div class="box-alice__inner">
                <div class="box-alice__aside">
                  <div class="box-alice__icon-outer">
                    <span class="box-alice__icon fl-bigmug-line-list63"></span>
                  </div>
                </div>
                <div class="box-alice__main">
                  <h5 class="box-alice__title">{{$t('lang.dashbord.text61')}}</h5>
                  <p class="box-alice__title-P">{{$t('lang.dashbord.text62')}}</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
    <!-- 二维码 -->
    <section class="code" id="Contactus">
      <div class="code-div">
        <h2 class="code-div-title wow-outer">
          <span
            class="code-div-span"
            ref="codeDivSpan"
            style="visibility:hidden"
          >{{$t('lang.dashbord.text63')}}</span>
        </h2>
        <div class="code2">
          <div
            class="code-div-col1 code-touming animated"
            ref="codeImgLeft"
            style="visibility:hidden"
          >
            <img class="code-div-col1-img" src="../assets/images/code-left.png" alt />
            <br />
            <p class="code-div-col1-p">{{$t('lang.dashbord.text64')}}</p>
          </div>
          <div class="code-div-col1" ref="codeImgRight" style="visibility:hidden">
            <img class="code-div-col1-img" src="../assets/images/code-right.jpg" alt />
            <br />
            <p class="code-div-col1-p">{{$t('lang.dashbord.text65')}}</p>
          </div>
        </div>
      </div>
    </section>
    <!-- 联系表单 -->
    <section class="section section-md bg-white">
      <div class="container container_bigger">
        <div
          class="row justify-content-md-center justify-content-xl-between row-2-columns-bordered row-50"
        >
          <div class="col-md-10 col-lg-5 wow-outer">
            <div class="wow contact-left" ref="getInTouch" style="visibility:hidden">
              <h3>{{$t('lang.dashbord.text66')}}</h3>
              <ul class="list-creative">
                <li>
                  <dl class="list-terms-medium list-terms-medium_tertiary">
                    <dt>{{$t('lang.dashbord.text71')}}</dt>
                    <dd>
                      <ul class="list-comma">
                        <li>
                          <a href="mailto:#">{{$t('lang.dashbord.text72')}}</a>
                        </li>
                      </ul>
                    </dd>
                  </dl>
                </li>
              </ul>
              <div class="list-comma-line"></div>
            </div>
          </div>
          <div class="col-md-10 col-lg-7 col-xl-6 wow-outer">
            <div class="wow contact-right" ref="contactForm" style="visibility:hidden">
              <h3 class="text-center">{{$t('lang.dashbord.text73')}}</h3>
              <!-- RD Mailform-->

              <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <div class="getDiv">
                  <el-form-item prop="getname">
                    <el-input
                      class="getname"
                      type="text"
                      v-model="ruleForm.getname"
                      :placeholder="$t('lang.dashbord.text75')"
                    />
                  </el-form-item>
                  <el-form-item prop="getphone">
                    <el-input
                      type="text"
                      class="getphone"
                      v-model="ruleForm.getphone"
                      :placeholder="$t('lang.dashbord.text76')"
                    />
                  </el-form-item>
                </div>
                <el-form-item prop="getmessage">
                  <el-input
                    type="textarea"
                    class="getmessage"
                    v-model="ruleForm.getmessage"
                    :placeholder="$t('lang.dashbord.text77')"
                  />
                </el-form-item>
                <div class="getemailBtn">
                  <el-form-item prop="getemail">
                    <el-input
                      type="text"
                      class="getemail"
                      v-model="ruleForm.getemail"
                      :placeholder="$t('lang.dashbord.text78')"
                    />
                  </el-form-item>
                  <div class="form-col4">
                    <button
                      offset="200"
                      type="button"
                      class="getBtn"
                      v-preventReClick="2000"
                      v-loading="loading"
                      @click="centerDialogVisibleBtn('ruleForm')"
                      v-on:click="reset()"
                    >{{btnHint}}</button>
                    <!-- 重置 -->
                    <button @click="resetForm('ruleForm')" class="btnHint"></button>
                  </div>
                </div>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { concatusData } from '../common/api/api'
export default {
  name: 'Dashbord',
  inject: ['reload'],
  data () {
    var validatePhone = (rule, value, callback) => {
      const reg = /^[0-9]*$/
      if (value === '' || value === undefined || value === null) {
        callback(new Error(this.$t('lang.dashbord.hint.text1')))
      } else {
        if ((!reg.test(value)) && value !== '') {
          callback(new Error(this.$t('lang.dashbord.hint.text2')))
        } else {
          callback()
        }
      }
    }
    var validateEMail = (rule, value, callback) => {
      // eslint-disable-next-line no-useless-escape
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (value === '' || value === undefined || value == null) {
        callback(new Error(this.$t('lang.dashbord.hint.text3')))
      } else {
        if (!reg.test(value)) {
          callback(new Error(this.$t('lang.dashbord.hint.text4')))
        } else {
          callback()
        }
      }
    }
    var validateName = (rule, value, callback) => {
      const reg = /^[ \u4E00-\u9FA5a-zA-Z/ ]+$/
      if (value === '' || value === undefined || value === null) {
        callback(new Error(this.$t('lang.dashbord.hint.text5')))
      } else {
        if ((!reg.test(value)) && value !== '') {
          callback(new Error(this.$t('lang.dashbord.hint.text6')))
        } else {
          callback()
        }
      }
    }
    var validateLength = (rule, value, callback) => {
      const reg = /^.{5,60}$/
      if (value === '' || value === undefined || value === null) {
        callback(new Error(this.$t('lang.dashbord.hint.text7')))
      } else {
        if (!reg.test(value)) {
          callback(new Error(this.$t('lang.dashbord.hint.text7')))
        } else {
          callback()
        }
      }
    }
    return {
      btnHint: this.$t('lang.dashbord.text80'), // 正在提交
      // 变量
      timer: null,
      activeNavigation: 'Home',
      boxCounterOne: 0,
      boxCounterTwo: 0,
      boxCounterThree: 0,
      boxCounterFour: 0,
      afterNumberChange: false,
      // ui
      languageSwitchVisible: false,
      animateRefList: [
        // 需要增加动画的元素的ref和动画名称的集合
        {
          refName: 'contentTextH1',
          animateName: 'fadeInUp'
        },
        {
          refName: 'contentTextP',
          animateName: 'fadeInUp'
        },
        {
          refName: 'toRegisterBtn',
          animateName: 'fadeInUp'
        },
        {
          refName: 'introductionLeft',
          animateName: 'slideInLeft'
        },
        {
          refName: 'introductionRight',
          animateName: 'slideInRight'
        },
        {
          refName: 'boxCounterOne',
          animateName: 'slideInDown'
        },
        {
          refName: 'boxCounterTwo',
          animateName: 'fadeInUp'
        },
        {
          refName: 'boxCounterThree',
          animateName: 'fadeInUp'
        },
        {
          refName: 'boxCounterFour',
          animateName: 'slideInDown'
        },
        {
          refName: 'whyChooseTitle',
          animateName: 'fadeInUp'
        },
        {
          refName: 'ourServicesTitle',
          animateName: 'fadeInUp'
        },
        {
          refName: 'codeDivSpan',
          animateName: 'fadeInUp'
        },
        {
          refName: 'getInTouch',
          animateName: 'slideInLeft'
        },
        {
          refName: 'contactForm',
          animateName: 'slideInRight'
        }
      ],
      ruleForm: {
        // 验证
        getname: '', // 名字
        getphone: '', // 电话
        getmessage: '', // 信息
        getemail: '' // 邮箱
      },
      rules: {
        getphone: [
          { validator: validatePhone, trigger: 'change' }
        ],
        getemail: [
          { validator: validateEMail, trigger: 'change' }
        ],
        getname: [
          { validator: validateName, trigger: 'change' }
        ],
        getmessage: [
          { validator: validateLength, trigger: 'change' }
        ]
      },
      getFormName: ''
    }
  },
  computed: {
    boxCounterOneString () {
      return this.boxCounterOne.toFixed(1)
    },
    boxCounterTwoString () {
      return this.boxCounterTwo.toFixed(0)
    },
    boxCounterThreeString () {
      return this.boxCounterThree.toFixed(0)
    },
    boxCounterFourString () {
      return this.boxCounterFour.toFixed(0)
    }
  },
  methods: {
    goAnchor (id) {
      this.activeNavigation = id
      document
        .getElementById(id)
        .scrollIntoView({ block: 'center', behavior: 'smooth' })
      this.addAnimate()
    },
    handleScroll () {
      // 滚动事件
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.addAnimate()
      }, 200)
    },
    addAnimate () {
      // 增加动画
      this.animateRefList.forEach(item => {
        if (
          this.$refs[item.refName].getBoundingClientRect().top <
          window.innerHeight + document.body.scrollTop
        ) {
          this.$refs[item.refName].style.visibility = 'visible'
          this.$refs[item.refName].classList.add(item.animateName)
          this.$refs[item.refName].classList.add('animated') // ie不支持同时添加
          switch (item.refName) {
            // 需要同时添加的动画的时候的补充
            case 'whyChooseTitle':
              this.$refs['whyChooseContent'].classList.add('fadeIn')
              this.$refs['whyChooseContent'].classList.add('animated')
              this.$refs['whyChooseContent'].style.visibility = 'visible'
              break
            case 'ourServicesTitle':

              this.$refs['ourServicesContent'].classList.add('fadeIn')
              this.$refs['whyChooseContent'].classList.add('animated')
              this.$refs['ourServicesContent'].style.visibility = 'visible'
              break
            case 'codeDivSpan':
              this.$refs['codeImgLeft'].classList.add('fadeIn')
              this.$refs['whyChooseContent'].classList.add('animated')
              this.$refs['codeImgLeft'].style.visibility = 'visible'
              this.$refs['codeImgRight'].classList.add('fadeIn')
              this.$refs['whyChooseContent'].classList.add('animated')
              this.$refs['codeImgRight'].style.visibility = 'visible'
              break
            // 数字递增
            case 'boxCounterOne':
              // js小数计算问题
              if (this.afterNumberChange) {
                break
              }
              this.afterNumberChange = true
              this.numberIncreasing('one', 0.08)
              this.numberIncreasing('two', 1.35)
              this.numberIncreasing('three', 4.35)
              this.numberIncreasing('four', 4.95)
              break
            default:
              break
          }
        }
      })
    },
    numberIncreasing (increaseTarget, growthRate) {
      // 动画是2秒默认2秒内增加到多少
      let count = 0
      let timer = setInterval(() => {
        if (count === 19) {
          clearInterval(timer)
        }
        count += 1
        switch (increaseTarget) {
          case 'one':
            this.boxCounterOne += growthRate
            break
          case 'two':
            this.boxCounterTwo += growthRate
            break
          case 'three':
            this.boxCounterThree += growthRate
            break
          case 'four':
            this.boxCounterFour += growthRate
            break
          default:
            break
        }
      }, 100)
    },
    toLoginAdmin () {
      if (this.$cookies.get('ALoginInfoSuccessList')) {
        this.$router.push({
          path: '/loginAndRegister/loginOfRecent',
          query: { isWho: 'admin' }
        })
      } else {
        this.$router.push({ path: '/loginAndRegister/ALogin' })
      }
    },
    toRegister () {
      this.$router.push({
        path: '/loginAndRegister/ARegisterOfIndex'
      })
    },
    tabLang (type) {
      this.$router.push({
        path: '/dashbord'
      })
      this.$cookies.set('think_var', type)
      this.$i18n.locale = type
      this.btnHint = this.$t('lang.dashbord.text80')
      this.languageSwitchVisible = false
      this.resetForm('ruleForm')
    },
    toHelp () {
      this.$router.push({
        path: '/helpCenter/help/helpRegister'
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 表单验证
    centerDialogVisibleBtn (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnHint = this.$t('lang.dashbord.text81')
          concatusData({
            name: this.ruleForm.getname,
            message: this.ruleForm.getmessage,
            phone: this.ruleForm.getphone,
            email: this.ruleForm.getemail
          }).then(resp => {
            if (resp.data.code === 1) {
              this.$message({
                offset: 250,
                message: resp.data.msg,
                type: 'success'
              })
              this.btnHint = this.$t('lang.dashbord.text80')
              this.ruleForm.getname = ''
              this.ruleForm.getmessage = ''
              this.ruleForm.getphone = ''
              this.ruleForm.getemail = ''
              this.resetForm('ruleForm')
            } else {
              this.$message({
                offset: 250,
                message: resp.data.msg,
                type: 'error'
              })
            }
          })
        } else {
        }
      })
    }
  },
  created () {
    console.log(this.$refs.bigbox)
    window.addEventListener('scroll', this.handleScroll)
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.bigbox.scrollIntoView()
      // this.$refs.bigbox.scrollTop = -200
    })
    this.addAnimate() // 防止在顶部时候已经有元素需要加动画
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style src='../utils/css/bootstrap.css' scoped>
</style>
<style  src='../utils/css/fonts.css' scoped>
</style>
<style src='../utils/css/style.css' scoped>
</style>
<style lang='less'>
.el-popover {
  min-width: 100px;
  width: 8rem;
}
.el-form-item__error {
  margin-left: 20px;
}
.el-input__inner {
  background-color: rgb(246, 243, 247);
}
.el-textarea__inner {
  background-color: rgb(246, 243, 247);
  height: 3rem;
}
</style>
<style lang="less" scoped>
.el-popover {
  min-width: 100px !important;
}
@import "../common/css/dash";
.popover-language {
  line-height: 1.875rem;
  font-size: 0.7rem;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s ease;
}
.popover-language:hover {
  background-color: #cccccc;
}
.popover-language-reference {
  cursor: pointer;
}
.popover-language-reference:focus {
  outline: none;
}
.btnHint {
  height: 0 !important;
  width: 0 !important;
  overflow: hidden !important;
  opacity: 0;
}
</style>
