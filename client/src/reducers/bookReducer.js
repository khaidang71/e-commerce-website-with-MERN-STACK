export const bookReducer = (state, action) => {
    switch (action.type) {
        case 'REFRESH_BOOK':
            return { ...state, book: action.payload };
          case 'CREATE_REQUEST':
            return { ...state, loadingCreateReview: true };
          case 'CREATE_SUCCESS':
            return { ...state, loadingCreateReview: false };
          case 'CREATE_FAIL':
            return { ...state, loadingCreateReview: false };
        case 'FETCH_REQUEST':
            return {
                ...state,
                loading: true,
            }
        case 'FETCH_SUCCESS':
            return {
                ...state,
                book: action.payload,
                loading: false
            };
        case 'FETCH_FAIL':
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}