<template>
  <div class="flex flex-center" style="height: 100vh">
    <q-card style="z-index: 100" class="bg rounded container q-gutter-sm">
      <div v-if="status == 0">
        <span class="text-body1 text-grey-3">
          Lets begin with your google login
        </span>
        <!-- <span class="text-h3">😁</span> -->
        <div class="q-mt-lg flex">
          <q-btn filled size="100" flat>
            <q-avatar>
              <img
                width="40px"
                src="
https://img.favpng.com/15/12/25/google-logo-google-adwords-g-suite-google-account-png-favpng-ZPDpvjf5PW8XaAnw6V9PQkcut.jpg"
              />
            </q-avatar>
          </q-btn>
          <q-btn
            class="text-white rounded flex column"
            style="background: #4285f4"
            label="Login with Google"
            flat
            color="primary"
            @click="loginWithGoogle"
          />
        </div>
      </div>

      <div v-else>
        <q-btn
          icon="arrow_back_ios"
          flat
          round
          style="align-self: flex-start"
          @click="status = 0"
        />
        <div class="text-body1 text-grey-3">Tell me about yourself</div>
        <div class="row">
          <div class="col-4 flex flex-center">
            <q-img
              class="q-mx-sm"
              width="150px"
              style="border-radius: 50%"
              :src="user.photoURL"
            />
          </div>
          <div class="col-8">
            <q-input
              color="secondary"
              filled
              v-model="user.roll"
              label="Roll No."
              class="q-mt-sm"
              style="width: 100%"
              :rules="[(val) => val.length != 10, 'Incorrect roll']"
            >
              <template v-slot:prepend>
                <q-icon name="tag" />
              </template>
            </q-input>
            <q-input
              color="secondary"
              filled
              v-model="user.fullname"
              class="q-mt-sm"
              label="Full Name"
              style="width: 100%"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
          </div>
        </div>
        <q-btn
          label="Submit"
          size="lg"
          color="primary"
          flat
          class="q-mt-lg rounded-sm shadow-primary bg-primary text-white"
          @click="submit"
        />
      </div>
    </q-card>
    <svg
      style="position: absolute; bottom: 0px"
      width="100%"
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
</template>

<script setup>
import { onMounted, ref } from "vue";
import { api } from "src/boot/axios";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "vue-router";
import { useUserStore } from "src/stores/user";
import { useQuasar } from "quasar";

const $router = useRouter();
const $q = useQuasar();
const userStore = useUserStore();

const status = ref(0);
const user = ref({
  uid: "",
  fullname: "",
  roll: "",
  photoURL: "",
  email: "",
});

const loginWithGoogle = () => {
  //TODO: submit to server
  console.log("login in with google");
  // console.log(fullname.value, roll.value);
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then(async (res) => {
      console.log(res);
      //get extra info from db
      const loggedUser = await userStore.fetchLoggedInUser();
      console.log(loggedUser);
      if (loggedUser) $router.push("/main");
      user.value = {
        googleUID: res.user.uid,
        fullname: res.user.displayName,
        roll: "20fh1a05",
        email: res.user.email,
        photoURL: res.user.photoURL,
      };

      status.value = 1;
    })
    .catch((err) => {
      console.log(err);
    });
};

const submit = () => {
  //TODO: submit to server
  console.log(user.value);
  console.log(userStore.user);
  api
    .post("/users", user.value)
    .then((res) => {
      userStore.user = user.value;
      // console.log(res);
      $router.push("/main");
    })
    .catch((err) => {
      $q.notify({ message: "Error in submitting data", color: "red" });
    });
};

onMounted(() => {
  setTimeout(() => {
    if (userStore.user && userStore.user.email) {
      $router.push("/main");
      $q.notify({
        message: "You are already logged in",
        color: "green",
      });
    }
  }, 1000);
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 400px;
  width: 500px;
  padding: 70px;
}
.bg {
  background-image: linear-gradient(to right top, $primary, $secondary);
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
