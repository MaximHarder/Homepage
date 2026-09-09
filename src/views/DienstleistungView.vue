<template>
  <div class="max-w-5xl px-3 sm:px-4 mx-auto xl:mx-0 xl:pl-16 mt-6" id="berechnung">
    <section class="bg-white/95 rounded-2xl p-6 mt-6 shadow" id="info">
      <span class="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded">{{
        $t('services.badgeTransparent')
      }}</span>
      <h2 class="text-2xl font-semibold mt-2">{{ $t('services.title') }}</h2>
      <small class="text-gray-600">{{ $t('services.subtitle') }}</small>
      <div class="mt-4 text-gray-800">
        {{ $t('services.tableIntro') }}<br />
        <span class="bg-blue-600 text-white text-xs px-2 py-1 rounded">{{
          $t('services.orientationBadge')
        }}</span>
      </div>
      <div class="overflow-x-auto mt-4">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="text-left py-2 px-4">{{ $t('services.table.kind') }}</th>
              <th class="text-left py-2 px-4">{{ $t('services.table.value') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="py-2 px-4 align-top">
                <div class="font-semibold">{{ $t('services.rows.hourlyRate.title') }}</div>
                <div class="text-sm text-gray-600">{{ $t('services.rows.hourlyRate.desc') }}</div>
              </td>
              <td class="py-2 px-4">
                <span id="stundensatz">{{ stundensatz }}</span> €
              </td>
            </tr>
            <tr>
              <td class="py-2 px-4 align-top">
                <div class="font-semibold">{{ $t('services.rows.additionalCosts.title') }}</div>
                <div class="text-sm text-gray-600">
                  {{ $t('services.rows.additionalCosts.desc') }}
                </div>
              </td>
              <td class="py-2 px-4">
                <span id="zussatz">{{ zusaetzlicheKostenProStunde }}</span> €/h
                {{ $t('services.or') }}
                <span id="zussatzP">{{ zusaetzlicheKostenProMonat }}</span> €
              </td>
            </tr>
            <tr>
              <td class="py-2 px-4 align-top">
                <div class="font-semibold">{{ $t('services.rows.bab.title') }}</div>
                <div class="text-sm text-gray-600">{{ $t('services.rows.bab.desc') }}</div>
              </td>
              <td class="py-2 px-4">{{ calcConfig.babPercent }} %</td>
            </tr>
            <tr>
              <td class="py-2 px-4 align-top">
                <div class="font-semibold">{{ $t('services.rows.vat.title') }}</div>
                <div class="text-sm text-gray-600">{{ $t('services.rows.vat.desc') }}</div>
              </td>
              <td class="py-2 px-4">{{ calcConfig.vatPercent }} %</td>
            </tr>
            <tr>
              <td class="py-2 px-4 align-top">
                <div class="font-semibold">{{ $t('services.rows.priority.title') }}</div>
                <div class="text-sm text-gray-600">{{ $t('services.rows.priority.desc') }}</div>
              </td>
              <td class="py-2 px-4">200 %</td>
            </tr>
            <tr>
              <td class="py-2 px-4 align-top">
                <div class="font-semibold">{{ $t('services.rows.distance.title') }}</div>
                <div class="text-sm text-gray-600">{{ $t('services.rows.distance.desc') }}</div>
              </td>
              <td class="py-2 px-4">{{ distanceRate.toFixed(2) }} €/km</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-4 text-gray-700">
        {{ $t('services.disclaimer') }}
      </div>
    </section>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
      <section class="bg-white/95 rounded-2xl p-6 lg:col-span-2 shadow" id="leistungen">
        <span class="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded">{{
          $t('services.title')
        }}</span>
        <h2 class="text-2xl font-semibold mt-2">{{ $t('services.title') }}</h2>
        <small class="text-gray-600">{{ $t('services.subtitle') }}</small>
        <div class="mt-4 divide-y divide-gray-200">
          <div
            class="py-3 flex items-start justify-between gap-4"
            v-for="leistung in leistungen"
            :key="leistung.id"
          >
            <div>
              <div class="font-semibold">{{ $t('services.items.' + leistung.id + '.name') }}</div>
              <div class="text-sm text-gray-600">
                {{ $t('services.items.' + leistung.id + '.desc') }}
              </div>
              <div class="mt-1 text-sm">
                <b>{{ $t('services.flat') }}:</b> {{ leistung.pauschal }} € |
                <b>{{ $t('services.hourly') }}:</b> {{ leistung.stunde }} €
              </div>
            </div>
            <button
              class="shrink-0 bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700"
              @click="addToBasket(leistung)"
            >
              {{ $t('services.addToOffer') }}
            </button>
          </div>
        </div>
      </section>

      <section class="bg-white/95 rounded-2xl p-6 shadow" id="zwischen">
        <h2 class="text-2xl font-semibold">{{ $t('services.subtotalTitle') }}</h2>
        <small class="text-gray-600">{{ $t('services.subtotalSubtitle') }}</small>
        <div class="mt-4 space-y-2">
          <div>
            <label class="font-medium">Preis</label>
            <div class="mt-2 flex flex-col gap-1">
              <label class="inline-flex items-center gap-2">
                <input type="radio" name="preis" value="stunde" v-model="preisModus" />
                <span>{{ $t('services.hourly') }}</span>
              </label>
              <label class="inline-flex items-center gap-2">
                <input type="radio" name="preis" value="pauschal" v-model="preisModus" />
                <span>{{ $t('services.flat') }}</span>
              </label>
            </div>
          </div>

          <div v-if="basket.length" class="mt-4 space-y-2 text-sm sm:text-base">
            <div class="flex items-start justify-between gap-3" v-for="it in basket" :key="it.id">
              <div class="flex-1">
                <template v-if="preisModus === 'stunde'">
                  {{ it.name }} — {{ getItemMinHours(it) }} h × {{ rate }} € =
                  {{ (getItemMinHours(it) * rate).toFixed(2) }} €
                </template>
                <template v-else> {{ it.name }} — {{ Number(it.pauschal).toFixed(2) }} € </template>
              </div>
              <button
                class="text-red-600 hover:text-red-700 text-pointer"
                @click="removeFromBasket(it.id)"
              >
                {{ $t('services.remove') }}
              </button>
            </div>
            <div class="font-semibold pt-2">
              {{ $t('services.subtotalTitle') }}: {{ subtotal.toFixed(2) }} €
            </div>
            <div v-if="preisModus === 'stunde'" class="text-xs text-gray-500">
              {{ $t('services.minHoursNote') }}
            </div>
            <div class="pt-2">
              <RouterLink
                :to="{ name: 'kontakt', params: { locale: localeParam } }"
                class="inline-block bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700"
                >{{ $t('services.requestOffer') }}</RouterLink
              >
            </div>
          </div>
        </div>
      </section>
    </div>

    <section class="bg-white/95 rounded-2xl p-6 mt-6 shadow" id="rechner">
      <h2 class="text-2xl font-semibold">{{ $t('services.calcTitle') }}</h2>
      <small class="text-gray-600">{{ $t('services.calcSubtitle') }}</small>

      <div class="mt-4">
        <label class="font-medium mr-4">{{ $t('services.calcModeLabel') }}</label>
        <label class="inline-flex items-center gap-2 mr-4">
          <input type="radio" name="calc_mode" value="stunde" v-model="calcMode" />
          <span>{{ $t('services.hourly') }}</span>
        </label>
        <label class="inline-flex items-center gap-2">
          <input type="radio" name="calc_mode" value="pauschal" v-model="calcMode" />
          <span>{{ $t('services.flatLabel') || 'Pauschalbetrag' }}</span>
        </label>
      </div>

      <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div v-if="calcMode === 'stunde'">
          <label class="block text-sm font-medium mb-1">{{ $t('services.hoursLabel') }}</label>
          <input
            type="number"
            min="8"
            class="w-full border rounded px-3 py-2"
            v-model.number="calculator.hours"
          />
        </div>
        <div v-if="calcMode === 'stunde'">
          <label class="block text-sm font-medium mb-1">{{ $t('services.hourlyRateLabel') }}</label>
          <input
            type="number"
            min="0"
            class="w-full border rounded px-3 py-2"
            v-model.number="calculator.userRate"
          />
        </div>
        <div v-if="calcMode === 'pauschal'">
          <label class="block text-sm font-medium mb-1">{{
            $t('services.flatLabel') || 'Pauschalbetrag (€)'
          }}</label>
          <input
            type="number"
            min="0"
            class="w-full border rounded px-3 py-2"
            v-model.number="calculator.flat"
          />
          <div class="text-xs text-gray-500 mt-1">{{ $t('services.overwriteSumNote') }}</div>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">{{ $t('services.distanceKm') }}</label>
          <input
            type="number"
            min="0"
            class="w-full border rounded px-3 py-2"
            v-model.number="calculator.distanceKm"
          />
          <div class="text-xs text-gray-500 mt-1">
            {{ $t('services.distanceNote', { rate: distanceRate.toFixed(2) }) }}
          </div>
          <div class="text-xs text-gray-400">
            {{ $t('services.chargeableKmLabel') }} {{ chargeableKm }}
          </div>
        </div>
        <div class="flex items-center gap-2 mt-2 sm:mt-0">
          <input id="prio" type="checkbox" v-model="calculator.priority" />
          <label for="prio">{{ $t('services.priority') }}</label>
        </div>
      </div>

      <div class="mt-6">
        <h3 class="text-sm font-semibold mb-2">{{ $t('services.settingsTitle') }}</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm mb-1">{{ $t('services.settingsBab') }}</label>
            <input
              type="number"
              min="0"
              class="w-full border rounded px-3 py-2"
              v-model.number="calcConfig.babPercent"
            />
          </div>
          <div>
            <label class="block text-sm mb-1">{{ $t('services.settingsVat') }}</label>
            <input
              type="number"
              min="0"
              class="w-full border rounded px-3 py-2"
              v-model.number="calcConfig.vatPercent"
            />
          </div>
          <div>
            <label class="block text-sm mb-1">{{ $t('services.settingsDistance') }}</label>
            <input
              type="number"
              min="0"
              step="0.01"
              class="w-full border rounded px-3 py-2"
              v-model.number="calcConfig.distanceRate"
            />
          </div>
        </div>
      </div>

      <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div class="space-y-1">
          <div class="flex justify-between">
            <span>{{ $t('services.summary.baseNet') }}</span
            ><span>{{ baseNet.toFixed(2) }} €</span>
          </div>
          <div class="flex justify-between">
            <span>{{ $t('services.summary.babAmount', { percent: calcConfig.babPercent }) }}</span
            ><span>{{ babAmount.toFixed(2) }} €</span>
          </div>
          <div class="flex justify-between font-medium">
            <span>{{ $t('services.summary.subtotal') }}</span
            ><span>{{ netPlusBab.toFixed(2) }} €</span>
          </div>
        </div>
        <div class="space-y-1">
          <div class="flex justify-between">
            <span>{{ $t('services.summary.vat', { percent: calcConfig.vatPercent }) }}</span
            ><span>{{ vatAmount.toFixed(2) }} €</span>
          </div>
          <div class="flex justify-between font-semibold text-blue-700">
            <span>{{ $t('services.summary.totalGross') }}</span
            ><span>{{ totalGross.toFixed(2) }} €</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const header = reactive({
  name: 'Dienstleistungen',
  sub: 'Auf dieser Seite finden Sie meine Dienstleistungen und deren Preise aufgelistet.',
})

const berechnung = reactive({
  brutto: 4000,
  vl: 100,
  krankenkasse: 14.6,
  kZusatz: 1.5,
  pflege: 3.05,
  arbeitslos: 1.5,
  soli: 5.5,
  rente: 18.6,
  kkinder: 0.25,
  bab: 9,
  verwaltung: 9,
  vertrieb: 9,
  material: {
    JetBrains: 650,
    Server: 216,
    Monitor: 500,
    Windows: 200,
    MOffice: 100,
    PCStuhl: 50,
    PC: 500,
    Monitore: 100,
    Drucker: 167,
    Tisch: 50,
    Tastatur: 33,
    Maus: 33,
  },
  gewinn: 20,
})

const zusatzsKosten = computed(() =>
  Math.round(
    (((berechnung.krankenkasse +
      berechnung.kZusatz +
      berechnung.pflege +
      berechnung.arbeitslos +
      berechnung.soli +
      berechnung.rente +
      berechnung.kkinder) *
      2) /
      100) *
      berechnung.brutto,
  ),
)
const stundensatz = computed(
  () =>
    (Math.round((berechnung.brutto + berechnung.vl + zusatzsKosten.value) / 156) *
      berechnung.gewinn) /
    10,
)
const lizenzenSum = computed(() =>
  Object.values(berechnung.material).reduce((a, b) => a + Math.round(b), 0),
)
const zusaetzlicheKostenProStunde = computed(() => Math.ceil(lizenzenSum.value / 365 / 24 + 2.5))
const zusaetzlicheKostenProMonat = computed(() => Math.ceil(lizenzenSum.value / 12 + 2.5))
const bab = computed(() => berechnung.bab)

const leistungen = reactive([
  {
    id: 'lastenheft',
    name: 'Lasten-/Pflichtenheft',
    beschreibung:
      'Das Lastenheft enthält alle Basisanforderungen und das grobe Konzept des Projekts.  Es fasst wirtschaftliche, technische und organisatorische Erwartungen zusammen.\n' +
      'Das Pflichtenheft enthält die ausformulierten Lösungen sowie die detaillierten Anforderungen auf Basis des Lastenhefts des Auftragnehmers. Es dient als Grundlage zur Auswahl der Angebote für den Auftraggeber.',
    pauschal: 200,
    stunde: stundensatz,
    pauschalOnly: false,
    minHours: 2,
  },
  {
    id: 'htmlthemeframe',
    name: 'HTML-Schablone',
    beschreibung:
      'Umsetzung einer Schablone von der Skizze (PSD, PDF, Bild, ...) in HTML5 und CSS3. Mit einem Framework (Bootstrap, Fomantic, ...).',
    pauschal: 500,
    stunde: stundensatz,
    pauschalOnly: false,
    minHours: 4,
  },
  {
    id: 'htmltheme',
    name: 'HTML-Schablone',
    beschreibung:
      'Umsetzung einer Schablone von der Skizze (PSD, PDF, Bild, ...) in HTML5 und CSS3. Alle Stile und Skripte extra für das Projekt schreiben.',
    pauschal: 750,
    stunde: stundensatz,
    pauschalOnly: false,
    minHours: 8,
  },
  {
    id: 'cmsplugin',
    name: 'CMS Erweiterung',
    beschreibung: 'Erstellung einer Erweiterung für ein CMS (DLE).',
    pauschal: 350,
    stunde: stundensatz,
    pauschalOnly: false,
    minHours: 20,
  },
  {
    id: 'custom_web',
    name: 'Eigene Webanwendung',
    beschreibung: 'Erstellung einer Webanwendung in PHP, Python oder Java',
    pauschal: 1500,
    stunde: stundensatz,
    pauschalOnly: false,
    minHours: 100,
  },
  {
    id: 'custom_win',
    name: 'Eigene Anwendung',
    beschreibung: 'Erstellung einer Anwendung in C#, Python oder JAVA',
    pauschal: 1500,
    stunde: stundensatz,
    pauschalOnly: false,
    minHours: 100,
  },
  {
    id: 'admin',
    name: 'Administrierung',
    beschreibung: 'Administration der Webseite, Hosting, ... (mtl. Zusatzleistung)',
    pauschal: 100,
    stunde: stundensatz,
    pauschalOnly: true,
    minHours: 100,
  },
])

type Leistung = (typeof leistungen)[number]
const basket = ref<Leistung[]>([])
const preisModus = ref<'stunde' | 'pauschal'>('stunde')
const addToBasket = (item: Leistung) => {
  if (!basket.value.find((x) => x.id === item.id)) {
    basket.value.push(item)
  }
}
const removeFromBasket = (id: string) => {
  basket.value = basket.value.filter((x) => x.id !== id)
}
const minHoursPerService = 8
function getItemMinHours(item: Leistung): number {
  const value = Number(item?.minHours)
  if (item?.pauschalOnly) return 1
  return Number.isFinite(value) && value > 0 ? value : minHoursPerService
}
const subtotal = computed(() => {
  if (!basket.value.length) return 0
  if (preisModus.value === 'stunde') {
    const r = Number(calculator.userRate || 0)
    return basket.value.reduce((sum, it) => sum + getItemMinHours(it) * r, 0)
  }
  return basket.value.reduce((sum, it) => sum + Number(it.pauschal || 0), 0)
})

onMounted(() => {
  document.title = 'Dienstleistungen & Preise – Web, Backend, Apps | Maxim Harder'
})

// Rechner-Logik
const calculator = reactive({ hours: 8, userRate: 0, priority: false, distanceKm: 0, flat: 0 })
const calcMode = ref('stunde')
watch(
  stundensatz,
  (val) => {
    if (!calculator.userRate) calculator.userRate = Number(val) || 0
  },
  { immediate: true },
)

const hoursEffective = computed(() => Math.max(8, Number(calculator.hours || 0)))
const rate = computed(() => Number(calculator.userRate || 0))
const additionalHourlyCapped = computed(() => {
  const perHour = Number(zusaetzlicheKostenProStunde.value || 0)
  const total = perHour * hoursEffective.value
  const cap = Number(zusaetzlicheKostenProMonat.value || 0)
  return Math.min(total, cap)
})
const calcConfig = reactive({ babPercent: bab.value, vatPercent: 19, distanceRate: 0.35 })
const distanceRate = computed(() => Number(calcConfig.distanceRate || 0))
const chargeableKm = computed(() => Math.max(0, Number(calculator.distanceKm || 0) - 10))
const baseNet = computed(() => {
  if (calcMode.value === 'stunde') {
    const userHourly = Number(calculator.userRate || 0)
    const distance = chargeableKm.value * distanceRate.value
    let base = userHourly * hoursEffective.value + additionalHourlyCapped.value + distance
    if (calculator.priority) base *= 3.0
    return base
  } else {
    const distance = chargeableKm.value * distanceRate.value
    let base = Number(subtotal.value || 0) + distance
    if (calculator.priority) base *= 3.0
    return base
  }
})

const babAmount = computed(() => baseNet.value * (Number(calcConfig.babPercent) / 100))
const netPlusBab = computed(() => baseNet.value + babAmount.value)
const vatAmount = computed(() => netPlusBab.value * (Number(calcConfig.vatPercent) / 100))
const totalGross = computed(() => netPlusBab.value + vatAmount.value)

const route = useRoute()
const localeParam = computed(() => (route.params?.locale === 'ru' ? 'ru' : undefined))
</script>
