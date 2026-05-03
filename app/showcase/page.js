'use client'

import { useState } from 'react'

// ── Code snippets for server-side frameworks ──────────────────
const snippets = {
  
nextjs: `// Next.js App Router — API route + Server Component pattern
// app/api/chat/route.js — server-side API route (no client exposure)
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export async function POST(request) {
  const { messages } = await request.json()
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
  const chat  = model.startChat({ history: messages.slice(0, -1) })
  const result = await chat.sendMessage(messages.at(-1).content)
  return Response.json({ reply: result.response.text() })
}

// app/projects/page.jsx — Server Component (no "use client")
// Renders on the server, ships zero JS to the browser
export default async function Projects() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold">Projects</h1>
      {/* Static content — fast, SEO-friendly, no hydration */}
    </main>
  )
}`,

  django: `# Django — REST API view (explored via short bootcamp course)
# Pattern mirrors the kind of tax rate endpoint I built at HelloPOS
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import TaxRate

class TaxRateView(APIView):
    def get(self, request):
        state = request.query_params.get('state')
        rates = TaxRate.objects.filter(state=state)
        data  = [{'jurisdiction': r.jurisdiction,
                  'rate': r.rate} for r in rates]
        return Response({'state': state, 'rates': data})`,

  php: ` ['base' => 8.50, 'perLb' => 0.45],
        'ups'   => ['base' => 7.80, 'perLb' => 0.50],
    ];
    $r    = $rates[$carrier] ?? $rates['fedex'];
    $cost = $r['base'] + ($weight * $r['perLb']);
    return ['carrier' => strtoupper($carrier),
            'weight'  => $weight,
            'rate'    => round($cost, 2)];
}

$result = getShippingRate(12.5, 'fedex');
echo json_encode($result);
// {"carrier":"FEDEX","weight":12.5,"rate":14.13}`,

  spring: `// Spring Boot — REST controller for sales reporting
// Pattern from Java coursework at Utah Tech University
@RestController
@RequestMapping("/api/reports")
public class SalesReportController {

    @Autowired
    private SalesReportService reportService;

    @GetMapping("/sales-per-hour")
    public ResponseEntity<List<SalesReport>> getSalesPerHour(
        @RequestParam String date
    ) {
        List<SalesReport> report =
            reportService.getSalesPerHour(date);
        return ResponseEntity.ok(report);
    }

    @GetMapping("/export/csv")
    public ResponseEntity<byte[]> exportCsv(
        @RequestParam String date
    ) {
        byte[] csv = reportService.exportToCsv(date);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Disposition",
                    "attachment; filename=sales-report.csv");
        return ResponseEntity.ok().headers(headers).body(csv);
    }
}`,
}

// ── Live demo HTML strings ────────────────────────────────────
const vueDemo = `
<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <style>
    body { font-family: system-ui; background: #111; color: #eee;
           padding: 20px; margin: 0; }
    h3   { margin: 0 0 16px; font-size: 15px; color: #60a5fa; }
    select, button { background: #1f2937; color: #eee;
      border: 1px solid #374151; border-radius: 8px;
      padding: 8px 12px; font-size: 13px; cursor: pointer; }
    button { background: #2563eb; border-color: #2563eb;
             color: white; margin-top: 12px; width: 100%; }
    .row   { display: flex; gap: 10px; margin-bottom: 10px;
             align-items: center; }
    label  { font-size: 12px; color: #9ca3af; width: 70px; }
    .result { margin-top: 14px; background: #1f2937;
              border-radius: 10px; padding: 14px; font-size: 13px; }
    .rate  { font-size: 20px; font-weight: 600; color: #34d399; }
  </style>
</head>
<body>
<div id="app">
  <h3>Vue.js — Shipping Rate Calculator</h3>
  <div class="row">
    <label>Carrier</label>
    <select v-model="carrier">
      <option value="fedex">FedEx</option>
      <option value="ups">UPS</option>
    </select>
  </div>
  <div class="row">
    <label>Weight</label>
    <select v-model="weight">
      <option value="1">1 lb</option>
      <option value="5">5 lbs</option>
      <option value="10">10 lbs</option>
      <option value="25">25 lbs</option>
    </select>
  </div>
  <button @click="calculate">Get Rate</button>
  <div class="result" v-if="result">
    <div style="color:#9ca3af;font-size:11px;margin-bottom:4px">
      {{ carrier.toUpperCase() }} · {{ weight }} lb(s)
    </div>
    <div class="rate">\${{ result }}</div>
    <div style="font-size:11px;color:#6b7280;margin-top:4px">
      estimated shipping cost
    </div>
  </div>
</div>
<script>
const { createApp } = Vue
createApp({
  data() {
    return { carrier: 'fedex', weight: '5', result: null }
  },
  methods: {
    calculate() {
      const rates = { fedex: { base: 8.50, perLb: 0.45 },
                      ups:   { base: 7.80, perLb: 0.50 } }
      const r = rates[this.carrier]
      this.result = (r.base + r.perLb * +this.weight).toFixed(2)
    }
  }
}).mount('#app')
</script>
</body></html>`

const angularDemo = `
<!DOCTYPE html>
<html>
<head>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.3/angular.min.js"></script>
  <style>
    body { font-family: system-ui; background: #111; color: #eee;
           padding: 20px; margin: 0; }
    h3   { margin: 0 0 16px; font-size: 15px; color: #f472b6; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    th    { text-align: left; color: #9ca3af; font-size: 11px;
            text-transform: uppercase; letter-spacing: .05em;
            padding: 0 8px 8px; }
    td    { padding: 8px; border-top: 1px solid #1f2937; }
    .badge { background: #1f2937; border-radius: 4px;
             padding: 2px 8px; font-size: 11px; }
    .pos { color: #34d399; } .neg { color: #f87171; }
    input { background: #1f2937; border: 1px solid #374151;
            border-radius: 8px; padding: 6px 10px; color: #eee;
            font-size: 13px; width: 100%; margin-bottom: 12px; }
    .total { margin-top: 12px; background: #1f2937;
             border-radius: 10px; padding: 12px; font-size: 13px; }
  </style>
</head>
<body ng-app="salesApp" ng-controller="SalesCtrl">
  <h3>Angular — Sales Report Table</h3>
  <input ng-model="search" placeholder="Filter by method...">
  <table>
    <tr><th>Hour</th><th>Method</th><th>Sales</th><th>Tax</th></tr>
    <tr ng-repeat="row in sales | filter:{method:search}">
      <td>{{ row.hour }}</td>
      <td><span class="badge">{{ row.method }}</span></td>
      <td class="pos">\${{ row.sales.toFixed(2) }}</td>
      <td class="neg">\${{ row.tax.toFixed(2) }}</td>
    </tr>
  </table>
  <div class="total">
    Total: <strong class="pos">\${{ totalSales() }}</strong>
  </div>
<script>
angular.module('salesApp',[]).controller('SalesCtrl',function($scope){
  $scope.search = ''
  $scope.sales = [
    {hour:'9:00 AM', method:'Card', sales:342.50,tax:27.40},
    {hour:'10:00 AM',method:'Cash', sales:128.00,tax:10.24},
    {hour:'11:00 AM',method:'Card', sales:521.75,tax:41.74},
    {hour:'12:00 PM',method:'Card', sales:847.20,tax:67.78},
    {hour:'1:00 PM', method:'Cash', sales:213.40,tax:17.07},
  ]
  $scope.totalSales = function() {
    return $scope.sales
      .reduce(function(s,r){return s+r.sales},0).toFixed(2)
  }
})
</script>
</body></html>`

const reactDemo = `
<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { font-family: system-ui; background: #111; color: #eee;
           padding: 20px; margin: 0; }
    h3   { margin: 0 0 16px; font-size: 15px; color: #818cf8; }
    input, select { background: #1f2937; color: #eee;
      border: 1px solid #374151; border-radius: 8px;
      padding: 8px 10px; font-size: 13px; width: 100%;
      margin-bottom: 10px; }
    button { background: #4f46e5; color: white; border: none;
             border-radius: 8px; padding: 9px; font-size: 13px;
             cursor: pointer; width: 100%; margin-top: 2px; }
    .result { margin-top: 14px; background: #1f2937;
              border-radius: 10px; padding: 14px; }
    .row { display: flex; justify-content: space-between;
           font-size: 13px; margin-bottom: 6px; }
    .total { border-top: 1px solid #374151; margin-top: 8px;
             padding-top: 8px; font-weight: 600; color: #818cf8; }
    label { font-size: 11px; color: #9ca3af;
            display: block; margin-bottom: 4px; }
  </style>
</head>
<body>
<div id="root"></div>
<script type="text/babel">
const { useState } = React
const RATES = { UT: 0.0685, CA: 0.0725, TX: 0.0625, NV: 0.0685 }
function TaxCalc() {
  const [amount, setAmount] = useState('')
  const [state,  setState]  = useState('UT')
  const [result, setResult] = useState(null)
  function calculate() {
    const subtotal = parseFloat(amount) || 0
    const rate     = RATES[state]
    const tax      = subtotal * rate
    setResult({ subtotal, rate, tax, total: subtotal + tax })
  }
  return (
    <div>
      <h3>React — Tax Nexus Calculator</h3>
      <label>Sale Amount ($)</label>
      <input type="number" placeholder="0.00"
        value={amount} onChange={e => setAmount(e.target.value)} />
      <label>State Jurisdiction</label>
      <select value={state} onChange={e => setState(e.target.value)}>
        <option value="UT">Utah (6.85%)</option>
        <option value="CA">California (7.25%)</option>
        <option value="TX">Texas (6.25%)</option>
        <option value="NV">Nevada (6.85%)</option>
      </select>
      <button onClick={calculate}>Calculate Tax</button>
      {result && (
        <div className="result">
          <div className="row">
            <span style={{color:'#9ca3af'}}>Subtotal</span>
            <span>\${result.subtotal.toFixed(2)}</span>
          </div>
          <div className="row">
            <span style={{color:'#9ca3af'}}>Tax ({(result.rate*100).toFixed(2)}%)</span>
            <span style={{color:'#f87171'}}>\${result.tax.toFixed(2)}</span>
          </div>
          <div className="row total">
            <span>Total</span>
            <span>\${result.total.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  )
}
ReactDOM.createRoot(document.getElementById('root')).render(<TaxCalc/>)
</script>
</body></html>`

// ── Framework definitions ─────────────────────────────────────
const frameworks = [
  {
    name:    'Vue.js',
    color:   'text-green-400',
    border:  'border-green-900',
    type:    'live',
    demo:    vueDemo,
    
used:    'Used professionally at HelloPOS',

    desc:    'Vue\'s reactive data binding made it ideal for building ' +
             'real-time UI updates in the POS system — like live ' +
             'shipping rate comparisons as users changed package details.',
  },
  {
    name:    'Angular',
    color:   'text-pink-400',
    border:  'border-pink-900',
    type:    'live',
    demo:    angularDemo,
    
used:    'Used professionally at HelloPOS',

    desc:    'Angular\'s opinionated structure was a great fit for the ' +
             'data-heavy reporting dashboards — built-in filtering ' +
             'and two-way binding made tables like this straightforward.',
  },
  {
    name:    'React',
    color:   'text-indigo-400',
    border:  'border-indigo-900',
    type:    'live',
    demo:    reactDemo,
    
used:    'Used in projects & this portfolio',

    desc:    'React\'s component model and hooks make state-driven UIs ' +
             'clean and easy to reason about. Used in personal projects ' +
             'and React Native for the KippyCam IoT app.',
  },
  
{
    name:    'Next.js',
    color:   'text-white',
    border:  'border-gray-600',
    type:    'snippet',
    snippet: snippets.nextjs,
    used:    'Built this portfolio with it',
    desc:    'Next.js is a React framework with file-based routing, ' +
             'server components, and built-in API routes. This entire ' +
             'portfolio is built with Next.js — the AI chatbot runs ' +
             'through a Next.js API route to keep the key server-side.',
  },

  {
    name:    'Django',
    color:   'text-emerald-400',
    border:  'border-emerald-900',
    type:    'snippet',
    snippet: snippets.django,
    
used:    'Explored via bootcamp course',

    desc:    'Explored Django through a short bootcamp course. Its ' +
             'batteries-included approach and ORM are well-suited for ' +
             'the kind of data-heavy backend work I did at HelloPOS.',
  },
  {
    name:    'PHP',
    color:   'text-violet-400',
    border:  'border-violet-900',
    type:    'snippet',
    snippet: snippets.php,
    
used:    'Self-studied',

    desc:    'Self-studied PHP to understand how widely-used server-side ' +
             'web backends work. The shipping rate pattern here is ' +
             'conceptually similar to the ShipEngine work I did at HelloPOS.',
  },
  {
    name:    'Spring Boot',
    color:   'text-orange-400',
    border:  'border-orange-900',
    type:    'snippet',
    snippet: snippets.spring,
    
used:    'Java',

    desc:    'Worked with Spring Boot through Java at HelloPOS. ' +
             'The REST controller pattern here mirrors the reporting ' +
             'endpoints I built at HelloPOS — CSV export included.',
  },
]

// ── Main component ────────────────────────────────────────────
export default function Showcase() {
  const [active, setActive] = useState('Vue.js')
  const fw = frameworks.find(f => f.name === active)

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Framework Showcase</h1>
        <p className="text-gray-400">
          Live demos and code examples across the frameworks I know.
          Frontend demos run directly in the browser — backend
          snippets show real patterns I've used or studied.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {frameworks.map(f => (
          <button
            key={f.name}
            onClick={() => setActive(f.name)}
            className={`px-4 py-2 rounded-full text-sm font-medium
              border transition
              ${active === f.name
                ? `${f.color} ${f.border} bg-gray-900`
                : 'text-gray-500 border-gray-800 hover:border-gray-700'
              }`}
          >
            {f.name}
            {f.type === 'live' && (
              <span className="ml-1.5 text-xs opacity-60">● live</span>
            )}
          </button>
        ))}
      </div>

      {fw && (
        <div
          key={fw.name}
          className={`bg-gray-900 border ${fw.border} rounded-2xl overflow-hidden`}
        >
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className={`text-xl font-semibold ${fw.color}`}>
                {fw.name}
              </h2>
              <span className="text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded-full">
                {fw.used}
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">
              {fw.desc}
            </p>
          </div>

          {fw.type === 'live' && (
            <div className="p-6">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                Live Demo
              </div>
              <iframe
                srcDoc={fw.demo}
                className="w-full rounded-xl border border-gray-800"
                style={{ height: '260px' }}
                sandbox="allow-scripts"
                title={`${fw.name} demo`}
              />
            </div>
          )}

          {fw.type === 'snippet' && (
            <div className="p-6">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                Code Example
              </div>
              <pre className="bg-[#0f1117] rounded-xl p-4 overflow-x-auto
                          text-xs text-gray-300 leading-relaxed">
                <code>{fw.snippet}</code>
              </pre>
            </div>
          )}
        </div>
      )}
    </main>
  )
}
