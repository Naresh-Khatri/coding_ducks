<template>
  <!-- <div id="cursorBlob" ref="CURSOR"></div> -->
  <div style="display: relative; height: 100vh; overflow: ">
    <header class="header flex justify-between">
      <div class="logo text-primary">
        <!-- &lt;CodingDucks /&gt; -->
      </div>
      <div class="get-started">
        <router-link to="/login">
          <q-btn
            flat
            rounded
            size="18px"
            class="bg-primary text-white"
            label="get started"
          />
        </router-link>
      </div>
    </header>
    <div class="container">
      <main class="hero flex q-mt-lg row">
        <section class="col-8 flex items-center">
          <div
            class="text-h1"
            style="font-size: 64px; font-weight: 800; color: #2d3748"
          >
            <span class="text-primary">&lt;</span>CodingDucks<span
              class="text-primary"
            >
              /&gt;</span
            >
          </div>
          <div
            style="
              font-size: 20px;
              font-weight: 400;
              color: #718096;
              padding-right: 200px;
              padding-left: 40px;
            "
          >
            CodingDucks is a small project developed for the sole purpose of
            helping students learn to code. It is a simple, fun, and educational
            platform for students to practice their coding skills.
          </div>
          <div class="q-mt-lg q-ml-xl">
            <router-link to="/login">
              <q-btn
                size="lg"
                class="rounded bg-primary q-px-lg text-secondary"
                flat
                round
                label="get started"
                icon-right="send"
              />
            </router-link>
          </div>
        </section>
        <section class="col-4 flex justify-center">
          <img style="width: 100%" :src="HeroImg" />
        </section>
      </main>
    </div>
    <div style="position: absolute; bottom: -50px; width: 100vw">
      <svg
        width="100%"
        height="100%"
        id="svg"
        viewBox="0 0 1440 500"
        xmlns="http://www.w3.org/2000/svg"
        class="transition duration-300 ease-in-out delay-150"
      >
        <defs>
          <linearGradient id="gradient" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="5%" stop-color="#cfbdec88"></stop>
            <stop offset="95%" stop-color="#742ff688"></stop>
          </linearGradient>
        </defs>
        <path
          d="M 0,500 C 0,500 0,166 0,166 C 89.74162679425837,168.50717703349284 179.48325358851673,171.01435406698565 269,162 C 358.51674641148327,152.98564593301435 447.8086124401914,132.44976076555022 549,142 C 650.1913875598086,151.55023923444978 763.2822966507177,191.18660287081337 874,187 C 984.7177033492823,182.81339712918663 1093.0622009569377,134.80382775119617 1187,124 C 1280.9377990430623,113.19617224880383 1360.468899521531,139.5980861244019 1440,166 C 1440,166 1440,500 1440,500 Z"
          stroke="none"
          stroke-width="0"
          fill="url(#gradient)"
          class="transition-all duration-300 ease-in-out delay-150 path-0"
        ></path>

        <defs>
          <linearGradient id="gradient" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="5%" stop-color="#cfbdecff"></stop>
            <stop offset="95%" stop-color="#742ff6ff"></stop>
          </linearGradient>
        </defs>
        <path
          d="M 0,500 C 0,500 0,333 0,333 C 83.50239234449762,338.1387559808612 167.00478468899524,343.2775119617225 282,330 C 396.99521531100476,316.7224880382775 543.4832535885167,285.0287081339713 628,279 C 712.5167464114833,272.9712918660287 735.0622009569377,292.6076555023924 815,315 C 894.9377990430623,337.3923444976076 1032.267942583732,362.5406698564594 1146,366 C 1259.732057416268,369.4593301435406 1349.8660287081339,351.22966507177034 1440,333 C 1440,333 1440,500 1440,500 Z"
          stroke="none"
          stroke-width="0"
          fill="url(#gradient)"
          class="transition-all duration-300 ease-in-out delay-150 path-1"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import HeroImg from "src/assets/hero-img.svg";

const CURSOR = ref(null);
const setCursorPos = (e) => {
  const { pageX: posX, pageY: posY } = e;
  CURSOR.value.style.top = `${posY - CURSOR.value.offsetHeight / 2}px`;
  CURSOR.value.style.left = `${posX - CURSOR.value.offsetWidth / 2}px`;
  // console.log(CURSOR.style.top, CURSOR.style.left);
};
onMounted(() => {
  const LINKS = document.querySelectorAll(".nav__link");

  // document.addEventListener("mousemove", setCursorPos);

  // const setCursorHover = () => (CURSOR.style.transform = "scale(2.5)");
  // const removeCursorHover = () => (CURSOR.style.transform = "");
  // LINKS.forEach((link) => link.addEventListener("mouseover", setCursorHover));
  // LINKS.forEach((link) =>
  //   link.addEventListener("mouseleave", removeCursorHover)
  // );
});
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:900");
* {
  font-family: "Inter", sans-serif;
}
.container {
  display: flex;
  flex-direction: column;
  padding: 0 200px;
  margin-top: 100px;
  // height: calc(100vh - 100px);
  // height: 100vh;
}
.header {
  padding: 0 200px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  font-family: "Montserrat", sans-serif;
  font-size: 30px;
  font-weight: 900;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 1px;
}
// #cursorBlob {
//   width: 50px;
//   height: 50px;
//   background: linear-gradient(
//     120deg,
//     #ff1744,
//     #e040fb,
//     #2979ff,
//     #00e5ff,
//     #76ff03
//   );
//   background-size: 1600% 1600%;
//   position: absolute;
//   mix-blend-mode: difference;
//   pointer-events: none;
//   z-index: 1;
//   transition: 0.15s linear;
//   animation: blobRadius 5s ease infinite, blobBackground 15s ease infinite;
// }
// @keyframes blobRadius {
//   0%,
//   100% {
//     border-radius: 43% 77% 80% 40% / 40% 40% 80% 80%;
//   }
//   20% {
//     border-radius: 47% 73% 61% 59% / 47% 75% 45% 73%;
//   }
//   40% {
//     border-radius: 46% 74% 74% 46% / 74% 58% 62% 46%;
//   }
//   60% {
//     border-radius: 47% 73% 61% 59% / 40% 40% 80% 80%;
//   }
//   80% {
//     border-radius: 50% 70% 52% 68% / 51% 61% 59% 69%;
//   }
// }
// @keyframes blobBackground {
//   0%,
//   100% {
//     background-position: 0% 50%;
//   }
//   50% {
//     background-position: 100% 50%;
//   }
// }

.nav {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  &__link {
    color: #fff;
    list-style: none;
    cursor: pointer;
    font-size: 10vw;
    font-family: "Montserrat", sans-serif;
    transition: 0.25s ease;
    &:not(:last-child) {
      margin-bottom: 50px;
    }
    &:hover {
      transform: translateX(25px);
    }
  }
}
</style>
<style>
.path-0 {
  animation: pathAnim-0 4s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
@keyframes pathAnim-0 {
  0% {
    d: path(
      "M 0,500 C 0,500 0,166 0,166 C 89.74162679425837,168.50717703349284 179.48325358851673,171.01435406698565 269,162 C 358.51674641148327,152.98564593301435 447.8086124401914,132.44976076555022 549,142 C 650.1913875598086,151.55023923444978 763.2822966507177,191.18660287081337 874,187 C 984.7177033492823,182.81339712918663 1093.0622009569377,134.80382775119617 1187,124 C 1280.9377990430623,113.19617224880383 1360.468899521531,139.5980861244019 1440,166 C 1440,166 1440,500 1440,500 Z"
    );
  }
  25% {
    d: path(
      "M 0,500 C 0,500 0,166 0,166 C 84.64114832535884,180.11483253588517 169.28229665071768,194.22966507177034 252,182 C 334.7177033492823,169.77033492822966 415.5119617224882,131.19617224880383 528,139 C 640.4880382775118,146.80382775119617 784.6698564593299,200.98564593301435 879,216 C 973.3301435406701,231.01435406698565 1017.8086124401914,206.86124401913875 1103,192 C 1188.1913875598086,177.13875598086125 1314.0956937799042,171.5693779904306 1440,166 C 1440,166 1440,500 1440,500 Z"
    );
  }
  50% {
    d: path(
      "M 0,500 C 0,500 0,166 0,166 C 109.4736842105263,166.2200956937799 218.9473684210526,166.4401913875598 309,161 C 399.0526315789474,155.5598086124402 469.68421052631584,144.4593301435407 555,156 C 640.3157894736842,167.5406698564593 740.3157894736843,201.7224880382775 833,207 C 925.6842105263157,212.2775119617225 1011.0526315789473,188.65071770334927 1111,177 C 1210.9473684210527,165.34928229665073 1325.4736842105262,165.67464114832535 1440,166 C 1440,166 1440,500 1440,500 Z"
    );
  }
  75% {
    d: path(
      "M 0,500 C 0,500 0,166 0,166 C 102.40191387559807,188.57416267942585 204.80382775119614,211.14832535885168 308,197 C 411.19617224880386,182.85167464114832 515.1866028708134,131.98086124401914 594,125 C 672.8133971291866,118.01913875598085 726.4497607655504,154.92822966507177 822,155 C 917.5502392344496,155.07177033492823 1055.0143540669856,118.3062200956938 1165,114 C 1274.9856459330144,109.6937799043062 1357.4928229665072,137.8468899521531 1440,166 C 1440,166 1440,500 1440,500 Z"
    );
  }
  100% {
    d: path(
      "M 0,500 C 0,500 0,166 0,166 C 89.74162679425837,168.50717703349284 179.48325358851673,171.01435406698565 269,162 C 358.51674641148327,152.98564593301435 447.8086124401914,132.44976076555022 549,142 C 650.1913875598086,151.55023923444978 763.2822966507177,191.18660287081337 874,187 C 984.7177033492823,182.81339712918663 1093.0622009569377,134.80382775119617 1187,124 C 1280.9377990430623,113.19617224880383 1360.468899521531,139.5980861244019 1440,166 C 1440,166 1440,500 1440,500 Z"
    );
  }
}
</style>
<style>
.path-1 {
  animation: pathAnim-1 4s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
@keyframes pathAnim-1 {
  0% {
    d: path(
      "M 0,500 C 0,500 0,333 0,333 C 83.50239234449762,338.1387559808612 167.00478468899524,343.2775119617225 282,330 C 396.99521531100476,316.7224880382775 543.4832535885167,285.0287081339713 628,279 C 712.5167464114833,272.9712918660287 735.0622009569377,292.6076555023924 815,315 C 894.9377990430623,337.3923444976076 1032.267942583732,362.5406698564594 1146,366 C 1259.732057416268,369.4593301435406 1349.8660287081339,351.22966507177034 1440,333 C 1440,333 1440,500 1440,500 Z"
    );
  }
  25% {
    d: path(
      "M 0,500 C 0,500 0,333 0,333 C 85.70334928229664,320.11004784689 171.40669856459328,307.2200956937799 266,299 C 360.5933014354067,290.7799043062201 464.07655502392345,287.22966507177034 559,303 C 653.9234449760766,318.77033492822966 740.2870813397129,353.8612440191388 844,365 C 947.7129186602871,376.1387559808612 1068.775119617225,363.32535885167465 1171,354 C 1273.224880382775,344.67464114832535 1356.6124401913876,338.8373205741627 1440,333 C 1440,333 1440,500 1440,500 Z"
    );
  }
  50% {
    d: path(
      "M 0,500 C 0,500 0,333 0,333 C 128.94736842105263,346.5980861244019 257.89473684210526,360.19617224880386 340,369 C 422.10526315789474,377.80382775119614 457.3684210526317,381.8133971291866 533,380 C 608.6315789473683,378.1866028708134 724.6315789473682,370.55023923444975 830,374 C 935.3684210526318,377.44976076555025 1030.1052631578948,391.9856459330144 1130,387 C 1229.8947368421052,382.0143540669856 1334.9473684210525,357.5071770334928 1440,333 C 1440,333 1440,500 1440,500 Z"
    );
  }
  75% {
    d: path(
      "M 0,500 C 0,500 0,333 0,333 C 112.59330143540669,341.5837320574162 225.18660287081337,350.1674641148325 319,343 C 412.8133971291866,335.8325358851675 487.8468899521532,312.91387559808607 583,315 C 678.1531100478468,317.08612440191393 793.425837320574,344.17703349282294 895,354 C 996.574162679426,363.82296650717706 1084.4497607655503,356.37799043062205 1173,350 C 1261.5502392344497,343.62200956937795 1350.7751196172248,338.311004784689 1440,333 C 1440,333 1440,500 1440,500 Z"
    );
  }
  100% {
    d: path(
      "M 0,500 C 0,500 0,333 0,333 C 83.50239234449762,338.1387559808612 167.00478468899524,343.2775119617225 282,330 C 396.99521531100476,316.7224880382775 543.4832535885167,285.0287081339713 628,279 C 712.5167464114833,272.9712918660287 735.0622009569377,292.6076555023924 815,315 C 894.9377990430623,337.3923444976076 1032.267942583732,362.5406698564594 1146,366 C 1259.732057416268,369.4593301435406 1349.8660287081339,351.22966507177034 1440,333 C 1440,333 1440,500 1440,500 Z"
    );
  }
}
</style>
