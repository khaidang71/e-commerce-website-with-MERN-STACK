// const { state, dispatch: ctxDispatch } = useContext(Store);
// const { fullBox, cart, userInfo } = state;

// const SignOut = () => {
//     ctxDispatch({ type: 'USER_SIGNOUT' });
//     localStorage.removeItem('userInfo');
//     localStorage.removeItem('shippingAddress');
//     localStorage.removeItem('paymentMethod');
//     window.location.href = '/signin';
// };
// const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
// const [categories, setCategories] = useState([]);

// useEffect(() => {
//     const fetchCategories = async () => {
//         try {
//             const { data } = await axios.get(`/api/products/categories`);
//             setCategories(data);
//         } catch (err) {
//             toast.error(getError(err));
//         }
//     };
//     fetchCategories();
// }, []);

// export default SignOut