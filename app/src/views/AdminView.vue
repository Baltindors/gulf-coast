<template>
  <div class="min-h-screen bg-[#FAF9F6] text-[#021E36] py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      
      <!-- Login Screen -->
      <div v-if="!user" class="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 class="text-4xl md:text-5xl font-serif text-[#021E36] mb-8 text-center">Admin Portal</h1>
        <button 
          @click="login" 
          class="bg-[#C1A172] hover:bg-[#a88b60] text-white font-medium py-3 px-8 rounded transition duration-300 shadow-md">
          Sign in with Google
        </button>
      </div>

      <!-- Unauthorized Screen -->
      <div v-else-if="!isAuthorized" class="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 class="text-4xl font-serif text-red-700 mb-4 text-center">Unauthorized Access</h1>
        <p class="text-lg text-gray-700 mb-8">Your email ({{ user.email }}) is not authorized to access this portal.</p>
        <button 
          @click="logout" 
          class="bg-[#021E36] hover:bg-[#011424] text-white font-medium py-2 px-6 rounded transition duration-300">
          Sign out
        </button>
      </div>

      <!-- PAT Configuration Screen -->
      <div v-else-if="!hasPat" class="flex flex-col items-center justify-center min-h-[60vh] max-w-lg mx-auto">
        <h1 class="text-3xl font-serif text-[#021E36] mb-6 text-center">GitHub Configuration</h1>
        <p class="mb-4 text-gray-700 text-center">Please enter your GitHub Personal Access Token (PAT) with `contents:write` permissions to enable saving changes.</p>
        <input 
          v-model="patInput" 
          type="password" 
          placeholder="ghp_xxxxxxxxxxxxxxxxxxxx" 
          class="w-full px-4 py-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#C1A172]"
        />
        <button 
          @click="savePat" 
          class="w-full bg-[#021E36] hover:bg-[#011424] text-white font-medium py-3 px-8 rounded transition duration-300">
          Save Token
        </button>
        <button 
          @click="logout" 
          class="mt-4 text-sm text-gray-500 hover:text-gray-800 underline">
          Cancel and Sign out
        </button>
      </div>

      <!-- Main Dashboard -->
      <div v-else class="pt-24 lg:pt-32"> <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-gold/20 pb-6 gap-6">
          <div>
            <h1 class="text-4xl font-serif text-navy">Admin Dashboard</h1>
            <p class="text-xs uppercase tracking-widest text-slate mt-1">Logged in as {{ user.email }}</p>
          </div>
          
          <div class="flex items-center gap-4 w-full md:w-auto">
            <button 
              @click="saveChanges" 
              :disabled="isSaving"
              class="flex-1 md:flex-none bg-gold hover:bg-gold-dark disabled:bg-slate/30 disabled:cursor-not-allowed text-white text-[11px] font-bold tracking-[0.2em] uppercase py-3 px-8 rounded-sm transition-all shadow-sm">
              {{ isSaving ? 'Saving...' : 'Save Changes' }}
            </button>
            <button 
              @click="logout" 
              class="flex-1 md:flex-none border border-navy text-navy hover:bg-navy hover:text-ivory text-[11px] font-bold tracking-[0.2em] uppercase py-3 px-8 rounded-sm transition-all">
              Sign out
            </button>
          </div>
        </div>
  
        <!-- Deployment Notification -->
        <div v-if="deployNotification" class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-8" role="alert">
          <p class="font-bold">Success!</p>
          <p>{{ saveStatus }}</p>
        </div>
        <div v-if="errorNotification" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8" role="alert">
          <p class="font-bold">Error</p>
          <p>{{ saveStatus }}</p>
        </div>

        <!-- Tabs -->
        <div class="flex border-b border-[#C1A172]/20 mb-8">
          <button 
            @click="activeTab = 'content'" 
            :class="['px-6 py-3 font-serif text-lg transition-colors focus:outline-none', activeTab === 'content' ? 'text-[#021E36] border-b-2 border-[#C1A172]' : 'text-gray-500 hover:text-[#021E36]']">
            Website Content
          </button>
          <button 
            @click="activeTab = 'employees'" 
            :class="['px-6 py-3 font-serif text-lg transition-colors focus:outline-none', activeTab === 'employees' ? 'text-[#021E36] border-b-2 border-[#C1A172]' : 'text-gray-500 hover:text-[#021E36]']">
            Employee Management
          </button>
        </div>

        <!-- Editor Sections -->
        <div class="grid grid-cols-1 gap-12" v-if="data && activeTab === 'content'">
          
          <!-- Packages -->
          <section>
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-3xl font-serif text-[#021E36]">IV Packages</h2>
              <button @click="triggerAddPackage" class="bg-[#C1A172] hover:bg-[#a88b60] text-white text-xs font-bold uppercase tracking-wider py-2.5 px-5 rounded shadow-sm transition" type="button">
                + Add Package
              </button>
            </div>
            <div class="space-y-8">
              <div v-for="(pkg, pkgIndex) in data.packages" :key="pkg.id" class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div class="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                  <h3 class="text-xl font-serif text-[#021E36]">Package: {{ pkg.name || pkg.id }}</h3>
                  <button @click="triggerDeletePackage(pkgIndex)" class="text-xs text-red-600 hover:text-red-800 font-bold uppercase tracking-wider transition" type="button">
                    Delete Package
                  </button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pb-6 border-b border-gray-100">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Package Name</label>
                    <input v-model="pkg.name" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-[#C1A172] focus:border-[#C1A172]" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                    <input v-model="pkg.subtitle" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-[#C1A172] focus:border-[#C1A172]" />
                  </div>
                  <div class="flex items-center mt-6">
                    <input type="checkbox" v-model="pkg.featured" :id="'feat-'+pkg.id" class="h-4 w-4 text-[#C1A172] focus:ring-[#C1A172] border-gray-300 rounded" />
                    <label :for="'feat-'+pkg.id" class="ml-2 block text-sm text-gray-900">Featured Package</label>
                  </div>
                </div>

                <h3 class="text-xl font-serif text-[#021E36] mb-4">Tiers & Pricing</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div v-for="(tier, tierIndex) in pkg.tiers" :key="tier.level" class="bg-gray-50 p-4 rounded border border-gray-200">
                    <div class="font-semibold text-[#021E36] mb-3 pb-2 border-b border-gray-200 flex justify-between items-center">
                      <div class="flex items-center gap-2">
                        <span>{{ tier.level }}</span>
                        <span class="text-xs font-normal text-gray-500">Tier</span>
                      </div>
                      <button @click="triggerDeleteTier(pkgIndex, tierIndex)" class="text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-wider transition" type="button" title="Delete Tier">
                        Delete
                      </button>
                    </div>
                    <div class="mb-3">
                      <label class="block text-xs text-gray-500 mb-1">Name</label>
                      <input v-model="tier.name" class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-[#C1A172]" />
                    </div>
                    <div class="mb-3">
                      <label class="block text-xs text-gray-500 mb-1">Price ($)</label>
                      <input type="number" v-model.number="tier.price" class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-[#C1A172]" />
                    </div>
                    <div class="flex items-center mt-2">
                      <input type="checkbox" :name="'pop-'+pkg.id" :checked="tier.mostPopular" @change="setMostPopular(pkgIndex, tierIndex)" class="h-3 w-3 text-[#C1A172] focus:ring-[#C1A172] border-gray-300 rounded" />
                      <label class="ml-2 block text-xs text-gray-700">Most Popular</label>
                    </div>
                    <div class="mt-4 pt-4 border-t border-gray-200">
                      <label class="block text-xs font-semibold text-gray-500 mb-2">Features</label>
                      <div class="space-y-2">
                        <div v-for="(feature, fIndex) in tier.features" :key="fIndex" class="flex gap-2 items-center">
                          <input v-model="tier.features[fIndex]" class="flex-grow px-2 py-1 text-sm border border-gray-300 rounded focus:ring-[#C1A172]" />
                          <button @click="removeTierFeature(pkgIndex, tierIndex, fIndex)" class="text-red-500 hover:text-red-700 text-lg leading-none" type="button">&times;</button>
                        </div>
                        <button @click="addTierFeature(pkgIndex, tierIndex)" class="text-xs text-[#C1A172] hover:text-[#a88b60] font-medium" type="button">+ Add Feature</button>
                      </div>
                    </div>
                  </div>

                  <!-- Add Tier Card -->
                  <div @click="triggerAddTier(pkgIndex)" class="bg-gray-50 border-2 border-dashed border-gray-300 rounded p-6 flex flex-col items-center justify-center min-h-[220px] hover:border-[#C1A172] hover:bg-[#C1A172]/5 transition group cursor-pointer">
                    <button class="text-sm font-semibold text-gray-500 group-hover:text-[#C1A172] transition flex flex-col items-center gap-2" type="button">
                      <span class="text-3xl">+</span>
                      <span>Add Tier</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Add Package Dashed Card -->
              <div @click="triggerAddPackage" class="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center hover:border-[#C1A172] hover:bg-[#C1A172]/5 transition group cursor-pointer">
                <button class="font-serif text-lg text-gray-500 group-hover:text-[#C1A172] transition flex items-center gap-2" type="button">
                  <span class="text-2xl font-sans">+</span>
                  <span>Add New IV Package</span>
                </button>
              </div>
            </div>
          </section>

          <!-- Custom Hydration -->
          <section>
            <h2 class="text-3xl font-serif text-[#021E36] mb-6">Custom Hydration</h2>
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
               <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input v-model="data.custom_hydration.name" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-[#C1A172]" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Starting Price ($)</label>
                    <input type="number" v-model.number="data.custom_hydration.starting_price" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-[#C1A172]" />
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <input v-model="data.custom_hydration.description" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-[#C1A172]" />
                  </div>
               </div>
            </div>
          </section>

          <!-- Addons -->
          <section>
            <h2 class="text-3xl font-serif text-[#021E36] mb-6">Add-on Inventory</h2>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              <!-- Vitamins -->
              <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-xl font-serif text-[#021E36] mb-4 border-b pb-2">Vitamins</h3>
                <div class="space-y-3">
                  <div v-for="(item, i) in data.addons.vitamins" :key="'v'+i" class="flex gap-4 items-center">
                    <input v-model="item.name" class="flex-grow px-2 py-1 text-sm border border-gray-300 rounded focus:ring-[#C1A172]" />
                    <div class="flex items-center gap-2 w-24">
                      <span class="text-gray-500">$</span>
                      <input type="number" v-model.number="item.price" class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-[#C1A172]" />
                    </div>
                    <button @click="removeItem('vitamins', i)" class="text-red-500 hover:text-red-700">&times;</button>
                  </div>
                  <button @click="addItem('vitamins')" class="text-sm text-[#C1A172] hover:text-[#a88b60] font-medium">+ Add Vitamin</button>
                </div>
              </div>

              <!-- Glutathione -->
              <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-xl font-serif text-[#021E36] mb-4 border-b pb-2">Glutathione Tiers</h3>
                <div class="space-y-3">
                  <div v-for="(item, i) in data.addons.glutathione" :key="'g'+i" class="flex gap-4 items-center">
                    <input v-model="item.amount" class="flex-grow px-2 py-1 text-sm border border-gray-300 rounded focus:ring-[#C1A172]" placeholder="e.g. 400 mg" />
                    <div class="flex items-center gap-2 w-24">
                      <span class="text-gray-500">$</span>
                      <input type="number" v-model.number="item.price" class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-[#C1A172]" />
                    </div>
                    <button @click="removeItem('glutathione', i)" class="text-red-500 hover:text-red-700">&times;</button>
                  </div>
                  <button @click="addItem('glutathione', true)" class="text-sm text-[#C1A172] hover:text-[#a88b60] font-medium">+ Add Tier</button>
                </div>
              </div>

              <!-- Injections -->
              <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-xl font-serif text-[#021E36] mb-4 border-b pb-2">Injections</h3>
                <div class="space-y-3">
                  <div v-for="(item, i) in data.addons.injections" :key="'i'+i" class="flex gap-4 items-center">
                    <input v-model="item.name" class="flex-grow px-2 py-1 text-sm border border-gray-300 rounded focus:ring-[#C1A172]" />
                    <div class="flex items-center gap-2 w-24">
                      <span class="text-gray-500">$</span>
                      <input type="number" v-model.number="item.price" class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-[#C1A172]" />
                    </div>
                    <button @click="removeItem('injections', i)" class="text-red-500 hover:text-red-700">&times;</button>
                  </div>
                  <button @click="addItem('injections')" class="text-sm text-[#C1A172] hover:text-[#a88b60] font-medium">+ Add Injection</button>
                </div>
              </div>

              <!-- Medications -->
              <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-xl font-serif text-[#021E36] mb-4 border-b pb-2">Medications</h3>
                <div class="space-y-3">
                  <div v-for="(item, i) in data.addons.medications" :key="'m'+i" class="flex gap-4 items-center">
                    <input v-model="item.name" class="flex-grow px-2 py-1 text-sm border border-gray-300 rounded focus:ring-[#C1A172]" />
                    <div class="flex items-center gap-2 w-24">
                      <span class="text-gray-500">$</span>
                      <input type="number" v-model.number="item.price" class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-[#C1A172]" />
                    </div>
                    <button @click="removeItem('medications', i)" class="text-red-500 hover:text-red-700">&times;</button>
                  </div>
                  <button @click="addItem('medications')" class="text-sm text-[#C1A172] hover:text-[#a88b60] font-medium">+ Add Medication</button>
                </div>
              </div>

            </div>
          </section>

        </div>

        <!-- Employee Management Section -->
        <div v-if="activeTab === 'employees'" class="space-y-12 animate-fade-in">
          
          <!-- Add New Employee -->
          <section class="bg-white p-6 rounded-lg shadow-sm border border-[#C1A172]/20">
            <h2 class="text-2xl font-serif text-[#021E36] mb-6">Onboard New Employee</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1 font-sans">Full Name</label>
                <input v-model="newEmpName" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-[#C1A172] focus:border-[#C1A172] font-sans" placeholder="Jane Doe" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1 font-sans">Email Address</label>
                <input v-model="newEmpEmail" type="email" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-[#C1A172] focus:border-[#C1A172] font-sans" placeholder="jane@example.com" />
              </div>
            </div>
            <button 
              @click="createEmployee" 
              :disabled="!newEmpName || !newEmpEmail"
              class="bg-[#021E36] hover:bg-[#011424] disabled:bg-gray-400 text-white px-6 py-2 rounded font-sans tracking-widest text-sm uppercase transition">
              Generate ID & Link
            </button>

            <div v-if="generatedLink" class="mt-6 p-4 bg-gray-50 border border-gray-200 rounded flex items-center justify-between">
              <span class="font-mono text-sm text-gray-800 break-all">{{ generatedLink }}</span>
              <button @click="copyLink" class="ml-4 bg-[#C1A172] hover:bg-[#a88b60] text-white px-4 py-2 rounded text-xs uppercase tracking-widest transition flex-shrink-0">
                Copy
              </button>
            </div>
          </section>

          <!-- Tracking Dashboard -->
          <section>
            <h2 class="text-2xl font-serif text-[#021E36] mb-6">Training Progress</h2>
            <div class="bg-white rounded-lg shadow-sm border border-[#C1A172]/20 overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sans">Employee</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sans">ID</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sans">Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sans">Progress</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="emp in employeesList" :key="emp.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-[#021E36] font-sans">{{ emp.name }}</div>
                      <div class="text-sm text-gray-500 font-sans">{{ emp.email }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 font-mono">
                        {{ emp.id }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="[
                        'px-2 inline-flex text-xs leading-5 font-semibold rounded-full font-sans uppercase tracking-wider',
                        emp.status === 'completed' ? 'bg-green-100 text-green-800' : 
                        emp.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'
                      ]">
                        {{ emp.status === 'not_started' ? 'Not Started' : emp.status === 'in_progress' ? 'In Progress' : 'Completed' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap w-1/3">
                      <div class="flex items-center">
                        <div class="w-full bg-gray-200 rounded-full h-2.5 mr-2 max-w-[150px]">
                          <div class="bg-[#C1A172] h-2.5 rounded-full transition-all duration-500" :style="{ width: `${getProgressPercentage(emp)}%` }"></div>
                        </div>
                        <span class="text-xs text-gray-500 font-sans">{{ getProgressPercentage(emp) }}%</span>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="employeesList.length === 0">
                    <td colspan="4" class="px-6 py-8 text-center text-gray-500 font-sans">No employees found.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </div>
    </div>
  </div>

  <!-- Confirmation Modal -->
  <div v-if="modal.show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
    <div class="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl border border-gray-100 transform transition-all duration-300">
      <h3 class="text-2xl font-serif text-[#021E36] mb-3">{{ modal.title }}</h3>
      <p class="text-gray-600 text-sm mb-6">{{ modal.message }}</p>
      
      <!-- Add Package Inputs -->
      <div v-if="modal.type === 'add-package'" class="space-y-4 mb-6">
        <div>
          <label class="block text-xs font-semibold uppercase text-gray-500 mb-1">Package ID (unique, lowercase, kebab-case)</label>
          <input v-model="modal.data.id" placeholder="e.g. customized-recovery" class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#C1A172] focus:border-[#C1A172] text-sm" />
        </div>
        <div>
          <label class="block text-xs font-semibold uppercase text-gray-500 mb-1">Package Name</label>
          <input v-model="modal.data.name" placeholder="e.g. Customized Recovery" class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#C1A172] focus:border-[#C1A172] text-sm" />
        </div>
        <div>
          <label class="block text-xs font-semibold uppercase text-gray-500 mb-1">Subtitle</label>
          <input v-model="modal.data.subtitle" placeholder="e.g. Optimized hangover recovery" class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#C1A172] focus:border-[#C1A172] text-sm" />
        </div>
      </div>
      
      <!-- Add Tier Inputs -->
      <div v-if="modal.type === 'add-tier'" class="space-y-4 mb-6">
        <div>
          <label class="block text-xs font-semibold uppercase text-gray-500 mb-1">Tier Level (e.g. Silver, Gold, Platinum)</label>
          <input v-model="modal.data.level" placeholder="e.g. Bronze" class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#C1A172] focus:border-[#C1A172] text-sm" />
        </div>
        <div>
          <label class="block text-xs font-semibold uppercase text-gray-500 mb-1">Tier Name (display name)</label>
          <input v-model="modal.data.name" placeholder="e.g. Coastal Bronze" class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#C1A172] focus:border-[#C1A172] text-sm" />
        </div>
        <div>
          <label class="block text-xs font-semibold uppercase text-gray-500 mb-1">Price ($)</label>
          <input type="number" v-model.number="modal.data.price" placeholder="199" class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#C1A172] focus:border-[#C1A172] text-sm" />
        </div>
      </div>

      <!-- Error Message if invalid -->
      <div v-if="modal.error" class="mb-4 text-xs text-red-600 font-semibold bg-red-50 p-2.5 rounded border border-red-200">
        {{ modal.error }}
      </div>

      <div class="flex justify-end gap-3">
        <button @click="cancelModal" class="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition" type="button">
          Cancel
        </button>
        <button @click="confirmModal" class="px-5 py-2 bg-[#021E36] hover:bg-[#011424] text-white rounded text-sm font-semibold transition" type="button">
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { auth, db } from '../firebase/config';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { Octokit } from '@octokit/rest';
import packagesJson from '../data/packages.json';

const user = ref(null);
const isAuthorized = ref(false);
const hasPat = ref(false);
const patInput = ref('');
const data = ref(null);

const isSaving = ref(false);
const deployNotification = ref(false);
const errorNotification = ref(false);
const saveStatus = ref('');

const activeTab = ref('content'); // 'content' or 'employees'

// Employee Management State
const employeesList = ref([]);
const newEmpName = ref('');
const newEmpEmail = ref('');
const generatedLink = ref('');

const fetchEmployees = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "employees"));
    const emps = [];
    querySnapshot.forEach((doc) => {
      emps.push({ id: doc.id, ...doc.data() });
    });
    // Sort by created at descending
    employeesList.value = emps.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  } catch (error) {
    console.error("Error fetching employees", error);
  }
};

const createEmployee = async () => {
  if (!newEmpName.value || !newEmpEmail.value) return;
  
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const newId = `GC-${randomNum}`;
  
  try {
    await setDoc(doc(db, "employees", newId), {
      name: newEmpName.value,
      email: newEmpEmail.value,
      status: 'not_started',
      progress: {},
      createdAt: new Date().toISOString()
    });
    
    generatedLink.value = `${window.location.origin}/onboarding?id=${newId}`;
    newEmpName.value = '';
    newEmpEmail.value = '';
    
    await fetchEmployees();
  } catch (error) {
    console.error("Error creating employee", error);
  }
};

const copyLink = () => {
  navigator.clipboard.writeText(generatedLink.value);
  alert("Link copied to clipboard!");
};

const getProgressPercentage = (emp) => {
  if (!emp.progress) return 0;
  const completedModules = Object.keys(emp.progress).length;
  // Based on onboarding.json which has 3 modules
  return Math.round((completedModules / 3) * 100);
};

// Get authorized emails from env, default to empty array if not set
const getAuthorizedEmails = () => {
  const envVal = import.meta.env.VITE_AUTHORIZED_ADMINS;
  if (!envVal) return [];
  return envVal.split(',').map(e => e.trim().toLowerCase());
};

onMounted(() => {
  // Deep copy the JSON data to avoid direct mutation issues
  data.value = JSON.parse(JSON.stringify(packagesJson));

  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
    if (currentUser) {
      const authorizedEmails = getAuthorizedEmails();
      if (authorizedEmails.includes(currentUser.email.toLowerCase()) || authorizedEmails.length === 0) {
        // If authorizedEmails is empty, we allow everyone for setup phase, but ideally we should restrict.
        isAuthorized.value = true;
        
        // Fetch employees
        fetchEmployees();
        
        const savedPat = localStorage.getItem('github_pat');
        if (savedPat) {
          hasPat.value = true;
          patInput.value = savedPat;
        }
      } else {
        isAuthorized.value = false;
      }
    } else {
      isAuthorized.value = false;
      hasPat.value = false;
    }
  });
});

const login = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out", error);
  }
};

const savePat = () => {
  if (patInput.value.trim()) {
    localStorage.setItem('github_pat', patInput.value.trim());
    hasPat.value = true;
  }
};

const setMostPopular = (pkgIndex, tierIndex) => {
  data.value.packages[pkgIndex].tiers.forEach((t, idx) => {
    t.mostPopular = (idx === tierIndex);
  });
};

const removeItem = (category, index) => {
  data.value.addons[category].splice(index, 1);
};

const addItem = (category, isAmount = false) => {
  if (isAmount) {
    data.value.addons[category].push({ amount: '', price: 0 });
  } else {
    data.value.addons[category].push({ name: '', price: 0 });
  }
};

const removeTierFeature = (pkgIndex, tierIndex, fIndex) => {
  data.value.packages[pkgIndex].tiers[tierIndex].features.splice(fIndex, 1);
};

const addTierFeature = (pkgIndex, tierIndex) => {
  if (!data.value.packages[pkgIndex].tiers[tierIndex].features) {
    data.value.packages[pkgIndex].tiers[tierIndex].features = [];
  }
  data.value.packages[pkgIndex].tiers[tierIndex].features.push('');
};

// Modal State & Trigger Handlers
const modal = ref({
  show: false,
  type: '',
  title: '',
  message: '',
  error: '',
  data: {},
  onConfirm: null
});

const openModal = (type, title, message, dataInit, onConfirm) => {
  modal.value = {
    show: true,
    type,
    title,
    message,
    error: '',
    data: { ...dataInit },
    onConfirm
  };
};

const cancelModal = () => {
  modal.value.show = false;
};

const confirmModal = () => {
  modal.value.error = '';

  if (modal.value.type === 'add-package') {
    const id = modal.value.data.id.trim();
    const name = modal.value.data.name.trim();
    if (!id || !name) {
      modal.value.error = 'Package ID and Name are required.';
      return;
    }
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) {
      modal.value.error = 'ID must be lowercase alphanumeric with hyphens (kebab-case), e.g. custom-recovery.';
      return;
    }
    const exists = data.value.packages.some(pkg => pkg.id === id);
    if (exists) {
      modal.value.error = 'A package with this ID already exists.';
      return;
    }
  }

  if (modal.value.type === 'add-tier') {
    const level = modal.value.data.level.trim();
    const name = modal.value.data.name.trim();
    const price = modal.value.data.price;
    if (!level || !name) {
      modal.value.error = 'Tier Level and Name are required.';
      return;
    }
    if (typeof price !== 'number' || isNaN(price) || price < 0) {
      modal.value.error = 'Price must be a valid non-negative number.';
      return;
    }
    const pkgIndex = modal.value.data.pkgIndex;
    const exists = data.value.packages[pkgIndex].tiers.some(t => t.level.toLowerCase() === level.toLowerCase());
    if (exists) {
      modal.value.error = `A tier with level "${level}" already exists in this package.`;
      return;
    }
  }

  if (modal.value.onConfirm) {
    modal.value.onConfirm(modal.value.data);
  }
  modal.value.show = false;
};

const triggerAddPackage = () => {
  openModal(
    'add-package',
    'Add New Package',
    'Enter the details to create a new package. It will start with an empty list of tiers.',
    { id: '', name: '', subtitle: '', image: '/images/packages/default.jpg', featured: false, tiers: [] },
    (dataVal) => {
      data.value.packages.push({
        id: dataVal.id.trim(),
        name: dataVal.name.trim(),
        subtitle: dataVal.subtitle.trim(),
        image: dataVal.image,
        featured: dataVal.featured,
        tiers: dataVal.tiers
      });
    }
  );
};

const triggerDeletePackage = (pkgIndex) => {
  const pkg = data.value.packages[pkgIndex];
  openModal(
    'delete-package',
    'Delete Package',
    `Are you sure you want to delete the package "${pkg.name || pkg.id}"? This will permanently remove all of its tiers.`,
    {},
    () => {
      data.value.packages.splice(pkgIndex, 1);
    }
  );
};

const triggerAddTier = (pkgIndex) => {
  openModal(
    'add-tier',
    'Add New Tier',
    'Specify the details for the new tier of this package.',
    { pkgIndex, level: '', name: '', price: 0, mostPopular: false, features: [] },
    (dataVal) => {
      data.value.packages[pkgIndex].tiers.push({
        level: dataVal.level.trim(),
        name: dataVal.name.trim(),
        price: dataVal.price,
        mostPopular: dataVal.mostPopular,
        features: dataVal.features
      });
    }
  );
};

const triggerDeleteTier = (pkgIndex, tierIndex) => {
  const pkg = data.value.packages[pkgIndex];
  const tier = pkg.tiers[tierIndex];
  openModal(
    'delete-tier',
    'Delete Tier',
    `Are you sure you want to delete the tier "${tier.level}" (${tier.name}) from the package "${pkg.name}"?`,
    {},
    () => {
      pkg.tiers.splice(tierIndex, 1);
    }
  );
};

const saveChanges = async () => {
  isSaving.value = true;
  deployNotification.value = false;
  errorNotification.value = false;

  try {
    const octokit = new Octokit({
      auth: patInput.value
    });

    const owner = 'baltindors';
    const repo = 'gulf-coast';
    const path = 'app/src/data/packages.json';

    // 1. Get current SHA
    const { data: fileData } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
    });

    const sha = fileData.sha;

    // 2. Prepare new content
    const jsonString = JSON.stringify(data.value, null, 2);
    // Convert to base64 safely supporting utf-8
    const base64Content = btoa(unescape(encodeURIComponent(jsonString)));

    // 3. Commit changes
    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: 'Admin UI: Update packages and pricing',
      content: base64Content,
      sha,
    });

    deployNotification.value = true;
    saveStatus.value = 'Changes have been pushed. Your updates will be live on the site in approximately 2–3 minutes.';
    
  } catch (error) {
    console.error("Error saving to GitHub", error);
    errorNotification.value = true;
    saveStatus.value = `Failed to save: ${error.message}`;
  } finally {
    isSaving.value = false;
  }
};
</script>
