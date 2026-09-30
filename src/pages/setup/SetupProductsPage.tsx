import { useNavigate } from 'react-router-dom'
import { ProductsPanel, SetupContent, SetupNav, SetupShell } from '../../components/onboarding'
import { productsCatalog } from '../../data/onboardingDefaults'
import { useOnboarding } from '../../context/OnboardingContext'

export function SetupProductsPage() {
  const navigate = useNavigate()
  const { state, toggleProductGrant, grantAllProducts } = useOnboarding()
  const grantedCount = state.grantedProducts.length
  const total = productsCatalog.length

  return (
    <SetupShell stage="products">
      <SetupContent
        stepLabel="Step 2 of 5"
        title="Your Trimble products"
        description={`Grant read access to the ones I should brief on. (${grantedCount} of ${total} granted)`}
        wide
        footer={
          <SetupNav
            onBack={() => navigate('/setup/profile')}
            primaryLabel="Continue"
            onPrimary={() => navigate('/setup/week/morning')}
          />
        }
      >
        <ProductsPanel
          products={productsCatalog}
          grantedIds={state.grantedProducts}
          onToggle={toggleProductGrant}
          onGrantAll={() => grantAllProducts(productsCatalog.map((p) => p.id))}
        />
      </SetupContent>
    </SetupShell>
  )
}
