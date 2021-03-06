import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import ArticlesList from '../../src/components/ArticlesList';

const store = createStore({
  state() {
    return {
      articles: [
        {
          title: 'First',
          description: 'First description'
        },
        {
          title: 'Second',
          description: 'Second description'
        }
      ]
    };
  }
});

const wrapper = shallowMount(ArticlesList, {
  global: {
    plugins: [store]
  }
});

test('ArticlesList.vue', async () => {
  expect(wrapper.vm.$options.name).toMatch('ArticlesList');
});

test('articles render', async () => {
  expect(wrapper.find('.cards__container').exists()).toBe(true);
});

test('when click in \'read more\' setCurrentArticle should be called', async () => {
  const $store = createStore({
    state() {
      return {
        currentArticle: '',
        articles: [
          {
            title: 'First',
            description: 'First description'
          },
          {
            title: 'Second',
            description: 'Second description'
          }
        ]
      };
    },
    commit: {
      setCurrentArticle: jest.fn()
    }
  });
  
  const wrapper = shallowMount(ArticlesList, {
    global: {
      mocks: {
        $store
      }
    }
  });

  const spy = jest.spyOn(wrapper.componentVM.$store.setCurrentArticle, 'setCurrentArticle');
  debugger;
  await wrapper.find('[data-button="read-more"]').trigger('click');
  debugger;
  expect(spy).toHaveBeenCalled();
  debugger;
});