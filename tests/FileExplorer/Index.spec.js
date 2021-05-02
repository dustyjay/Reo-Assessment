import { fireEvent, render } from '@testing-library/vue';
import { mount, shallowMount } from '@vue/test-utils';
import FileExplorer from '@/FileExplorer/Index.vue';

describe('File Explorer Page', () => {
  let wrapper;
  beforeEach(() => {
    const data = () => {
      return {
        showModal: false,
        selectedFiles: []
      };
    };

    wrapper = shallowMount(FileExplorer, {
      data
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('has only one button with the text `Select files`', () => {
    const button = wrapper.findAll('button');
    expect(button.length).toEqual(1);
    expect(button.at(0).text()).toBe('Select Files');
  });

  it('opens the modal after button is clicked', () => {
    const button = wrapper.find('button');
    button.trigger('click');
    expect(wrapper.vm.showModal).toBeTruthy();
  });

  it("hides the selected files section if it's empty", () => {
    const selectedFileSection = wrapper.find('.select-files');
    expect(selectedFileSection.exists()).toBeFalsy();
  });

  it('shows the items selected', async () => {
    const selectedFiles = [
      {
        id: 1,
        name: 'catfish.png'
      }
    ];
    await wrapper.setData({
      selectedFiles
    });
    const selectedFileSection = wrapper.find('.select-files');
    const listItems = selectedFileSection.findAll('li');
    expect(selectedFileSection.exists()).toBeTruthy();
    expect(listItems.length).toEqual(selectedFiles.length);
  });
});
