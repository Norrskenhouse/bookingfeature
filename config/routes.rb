Rails.application.routes.draw do
  resources :events, only: [:index, :create] do
    collection do
      get :bookings
    end
  end
end
